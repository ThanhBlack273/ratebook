import {useMemo, useRef, useState} from 'react';
import {Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';

const {width} = Dimensions.get('window');

const SnapCarousel = ({images = []}: {images: string[]}) => {
    const [indexSelected, setIndexSelected] = useState(0);
    const data = useMemo(() => {
        return images.map((image: string) => ({id: image, image: image}));
    }, [images]);

    const carouselRef = useRef<Carousel<{id: string; image: string}>>(null);
    const flatListRef = useRef<FlatList<{id: string; image: string}>>(null);

    const handleChange = (index: number) => {
        setIndexSelected(index);
        flatListRef.current?.scrollToOffset({offset: index * 50});
    };
    const handleChangeFlatlist = (index: number) => {
        if (index === indexSelected) return;
        carouselRef.current?.snapToItem(index);
    };

    return (
        <View style={styles.container}>
            <Carousel
                vertical={false}
                itemWidth={width}
                sliderWidth={width}
                layout="default"
                data={data}
                style={styles.containerCarousel}
                onSnapToItem={index => handleChange(index)}
                ref={carouselRef}
                renderItem={({item, index}) => (
                    <Image
                        key={index}
                        style={{width: width, height: width, marginTop: 40}}
                        resizeMode="contain"
                        source={{uri: item.image}}
                    />
                )}
            />
            <View>
                <Pagination
                    inactiveDotColor="gray"
                    dotColor={'#1E90FF'}
                    activeDotIndex={indexSelected}
                    dotsLength={data.length}
                    animatedDuration={150}
                    inactiveDotScale={1}
                />
            </View>
            <FlatList
                horizontal={true}
                data={data}
                keyExtractor={item => item.id}
                ref={flatListRef}
                renderItem={({item, index}) => (
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => handleChangeFlatlist(index)}>
                        <Image
                            style={[
                                styles.flatListImage,
                                {
                                    borderWidth: index === indexSelected ? 4 : 0.75,
                                    borderColor: index === indexSelected ? '#1E90FF' : 'white',
                                },
                            ]}
                            source={{uri: item.image}}
                        />
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#505050',
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    containerCarousel: {
        marginTop: 20,
    },
    flatListImage: {
        width: 80,
        height: 80,
        marginRight: 10,
        borderRadius: 16,
    },
});
export default SnapCarousel;
