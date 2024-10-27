import re
import sys
import argparse

def snake_to_camel(name):
    return ''.join(word.title() for word in name.split('_'))

def update_icon_name_enum(file_path, new_icon_name):
    try:
        with open(file_path, 'r') as file:
            content = file.read()

        enum_pattern = r'export enum IconName \{([^}]*)\}'
        enum_match = re.search(enum_pattern, content)

        if enum_match:
            enum_content = enum_match.group(1)
            snake_case = new_icon_name
            camel_case = snake_to_camel(new_icon_name)

            new_entry = f"\n  {camel_case} = '{snake_case}',"
            updated_enum_content = enum_content + new_entry

            updated_content = content.replace(enum_content, updated_enum_content)

            with open(file_path, 'w') as file:
                file.write(updated_content)

            print(f"Successfully added {new_icon_name} to IconName enum.")
        else:
            print("Error: IconName enum not found in the file.")
            sys.exit(1)
    except FileNotFoundError:
        print(f"Error: File not found - {file_path}")
        sys.exit(1)
    except PermissionError:
        print(f"Error: Permission denied to access file - {file_path}")
        sys.exit(1)
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        sys.exit(1)

def validate_snake_case(value):
    if not re.match(r'^[a-z0-9_]+$', value):
        raise argparse.ArgumentTypeError(f"'{value}' is not a valid snake_case string")
    return value

def main():
    parser = argparse.ArgumentParser(description="Update IconName enum in TypeScript file")
    parser.add_argument("file_path", help="Path to the TypeScript file")
    parser.add_argument("icon_name", help="New icon name to add (in snake_case, e.g., keyboard_double_arrow_left)", type=validate_snake_case)
    
    args = parser.parse_args()

    update_icon_name_enum(args.file_path, args.icon_name)

if __name__ == "__main__":
    main()
