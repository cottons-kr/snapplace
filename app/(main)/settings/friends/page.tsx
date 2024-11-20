import SettingsContainer from '@/components/page/settings/Container'
import SettingsFriendsAdd from '@/components/page/settings/pages/friends/Add'
import SettingsFriendsList from '@/components/page/settings/pages/friends/List'
import SettingsFriendsRequests from '@/components/page/settings/pages/friends/Requests'

export default function SettingsFriendsPage() {
  return <>
    <SettingsContainer title='친구 및 친구추가' gap={35}>
      <SettingsFriendsAdd />
      <SettingsFriendsRequests />
      <SettingsFriendsList />
    </SettingsContainer>
  </>
}
