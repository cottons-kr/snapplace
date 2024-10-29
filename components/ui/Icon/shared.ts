export enum IconName {
  Close = 'close',
  ArrowBack = 'arrow_back',

  Home = 'home',
  Map = 'map',
  GalleryThumbnail = 'gallery_thumbnail',
  AccountCircle = 'account_circle',
  LocationOn = 'location_on',
  PhotoCamera = 'photo_camera',
  CenterFocusWeak = 'center_focus_weak',
  ChevronBackward = 'chevron_backward',
  FlashlightOff = 'flashlight_off',
  FlashlightOn = 'flashlight_on',
  Image = 'image',
  Cached = 'cached',
  LocationSearching = 'location_searching',
  AddPhotoAlternate = 'add_photo_alternate',}

export type IconType = keyof typeof IconName
