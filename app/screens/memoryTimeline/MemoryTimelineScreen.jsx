import {Pressable, ScrollView, Text, View} from "react-native";
import TimelineItem from "../../components/memoryTimelineScreen/TimelineItem";
import {useNavigation} from "@react-navigation/native";
import {useEffect} from "react";
import Header from "../../components/common/Header";
import PrimaryButton from "../../components/common/PrimaryButton";
import {Octicons} from "@expo/vector-icons";

const MemoryTimelineScreen = () => {

    return <View style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
            <TimelineItem/>
            <TimelineItem/>
            <TimelineItem/>
        </ScrollView>
    </View>
}

export default MemoryTimelineScreen