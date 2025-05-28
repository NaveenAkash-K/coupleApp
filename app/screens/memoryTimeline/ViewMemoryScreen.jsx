import {ActivityIndicator, Image, ScrollView, Text, View} from "react-native";
import {StackActions, useNavigation, useRoute} from "@react-navigation/native";
import TextStyle from "../../constants/TextStyle";
import {LinearGradient} from 'expo-linear-gradient';
import Colors from "../../constants/Colors";
import moment from "moment";
import {useEffect} from "react";
import PrimaryButton from "../../components/common/PrimaryButton";
import {MaterialIcons} from "@expo/vector-icons";

const ViewMemoryScreen = () => {
    const route = useRoute()
    const navigation = useNavigation();
    const {params} = route;

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <PrimaryButton container={{borderRadius: 100, marginRight: 5}}
                                              onPress={() => {
                                                  navigation.navigate("addMemoryScreen", {
                                                      memory: params.memory,
                                                      edit: true
                                                  })
                                              }}
                                              pressable={{padding: 13}}>
                <MaterialIcons name="edit" size={20} color="black"/>
            </PrimaryButton>
        })
    }, []);

    return <ScrollView>
        {params.memory.imageName ? <View style={{position: 'relative'}}>
            {params.memory.base64 ? <Image
                source={{uri: `data:image/jpeg;base64,${params.memory.base64}`}}
                style={{height: 250, width: '100%'}}
                resizeMode="cover"
            /> : <View style={{
                height: 250,
                width: "100%",
                backgroundColor: Colors.background,
                justifyContent: "center"
            }}><ActivityIndicator size={"large"} color={Colors.primary}/></View>}

            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.6)']}
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 100,
                }}
            />

            <Text
                numberOfLines={2}
                ellipsizeMode={"tail"}
                style={[
                    TextStyle.headlineSmall,
                    {
                        position: 'absolute',
                        bottom: 20,
                        marginRight: 10,
                        left: 10,
                        color: 'white', // make text stand out on the gradient
                    },
                ]}
            >
                {params.memory.title}
            </Text>
            <Text style={[TextStyle.labelMedium, {
                position: 'absolute',
                bottom: 5,
                left: 10,
                color: 'white', // make text stand out on the gradient
            },]}>{moment(params.memory.date).format("DD MMMM YYYY")}</Text>

        </View> : <View style={{marginVertical: 10, marginHorizontal: 10}}>
            <Text
                numberOfLines={2}
                ellipsizeMode={"tail"}
                style={[
                    TextStyle.headlineSmall,
                ]}
            >
                {params.memory.title}
            </Text>
            <Text style={TextStyle.labelMedium}>{moment(params.memory.date).format("DD MMMM YYYY")}</Text>
        </View>}
        <View>
            <Text style={[TextStyle.bodyLarge, {
                padding: 10,
                textAlign: 'justify',
            }]}>
                {'\u2003\u2003'}{params.memory.description}
            </Text>
        </View>
    </ScrollView>
}

export default ViewMemoryScreen