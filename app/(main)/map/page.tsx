import MapHeader from '@/components/ui/Header/Map'
import MapCanvas from '@/components/page/map/Canvas'
import MapControl from '@/components/page/map/Control'

export default function MapPage() {
  return <>
    <MapHeader />
    <MapCanvas />
    <MapControl />
  </>
}
