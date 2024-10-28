export enum IconName {
  Close = 'close',
  ArrowBack = 'arrow_back',

  Home = 'home',
  Map = 'map',
  GalleryThumbnail = 'gallery_thumbnail',
  AccountCircle = 'account_circle',
  LocationOn = 'location_on',
  PhotoCamera = 'photo_camera',}

export type IconType = keyof typeof IconName
