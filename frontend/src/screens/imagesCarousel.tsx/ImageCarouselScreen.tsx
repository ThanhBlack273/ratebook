import {SnapCarousel} from '../../common/components';
import {ImageCarouselScreenProps} from '../../navigator/StackNavigatorTypes';

const ImageCarouselScreen = ({route, navigation}: ImageCarouselScreenProps) => {
    return <SnapCarousel images={route.params.images || []} />;
};
export default ImageCarouselScreen;
