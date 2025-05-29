import {View, Text, StyleSheet, Image, ScrollView} from "react-native";
import Colors from "../../constants/Colors";
import {Ionicons} from "@expo/vector-icons";
import {useEffect} from "react";
import {useNavigation} from "@react-navigation/native";
import TextStyle from "../../constants/TextStyle";

const PartnerScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({headerTitle: "You ❤️ Partner"});
    }, []);

    return (
        <ScrollView style={styles.container}>
            {/* Couple Info */}
            <View style={styles.coupleCard}>
                <View style={styles.avatarRow}>
                    <View style={styles.avatar}/>
                    <Ionicons name="heart" size={40} color={Colors.primary}/>
                    <View style={styles.avatar}/>
                </View>
                <Text style={[TextStyle.labelMedium, styles.linkedText]}>Together since: Jan 1, 2023</Text>
                {/*<Text style={[TextStyle.labelMedium, styles.linkedText]}>243 days</Text>*/}
                <Text style={[TextStyle.labelMedium, styles.linkedText]}>1 year, 4 months, 1 day</Text>
            </View>

            {/* Stats Cards */}
            <View style={{flexDirection: "row", gap: 10, marginVertical: 10}}>
                <StatCard label="Total Memories" value="37" icon="images-outline"/>
                <StatCard label="Your Memories" value="22" icon="person-circle-outline"/>
                <StatCard label="Partner's Memories" value="15" icon="person-circle-outline"/>
            </View>
            <View style={styles.statsGrid}>
                <StatCard label="First Memory" value="Jan 14" icon="calendar-outline"/>
                <StatCard label="Last Memory" value="3 days ago" icon="calendar-outline"/>
                {/*<StatCard label="Next Milestone" value="250 days" icon="gift-outline" />*/}
                {/*<StatCard label="Places Visited" value="5" icon="location-outline" />*/}
                {/*<StatCard label="Common Tags" value="Cafe, Travel" icon="pricetags-outline" />*/}
            </View>

            {/* Promises Section */}
            {/*<View style={styles.promisesCard}>*/}
            {/*    <Text style={styles.sectionTitle}>Shared Promises 💌</Text>*/}
            {/*    <Text style={styles.promiseItem}>• Always be honest</Text>*/}
            {/*    <Text style={styles.promiseItem}>• Never sleep angry</Text>*/}
            {/*    <Text style={styles.promiseItem}>• Explore the world together</Text>*/}
            {/*</View>*/}

            {/* Recent Photos Preview */}
            {/*<View style={styles.galleryCard}>*/}
            {/*    <Text style={styles.sectionTitle}>Recent Photos 📸</Text>*/}
            {/*    <View style={styles.photoRow}>*/}
            {/*        <Image source={{ uri: "https://via.placeholder.com/80" }} style={styles.photo} />*/}
            {/*        <Image source={{ uri: "https://via.placeholder.com/80" }} style={styles.photo} />*/}
            {/*        <Image source={{ uri: "https://via.placeholder.com/80" }} style={styles.photo} />*/}
            {/*    </View>*/}
            {/*</View>*/}
        </ScrollView>
    );
};

const StatCard = ({label, value, icon}) => (
    <View style={styles.statCard}>
        <Ionicons name={icon} size={24} color={Colors.primary}/>
        <Text style={[TextStyle.titleMedium, styles.statValue]}>{value}</Text>
        <Text style={[TextStyle.labelMedium, styles.statLabel]}>{label}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: Colors.background, padding: 15},
    coupleCard: {
        backgroundColor: Colors.primaryContainer,
        paddingVertical: 25,
        borderRadius: 15,
        alignItems: "center",
    },
    avatarRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        width: "100%",
        marginBottom: 10,
    },
    avatar: {
        height: 70,
        width: 70,
        borderColor: Colors.primary,
        borderWidth: 1,
        borderRadius: 100,
    },
    linkedText: {
        marginTop: 6,
        color: Colors.primary,
    },
    statsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        gap: 10
    },
    statCard: {
        backgroundColor: Colors.primaryContainer,
        padding: 10,
        borderRadius: 12,
        alignItems: "center",
        flex: 1,
    },
    statValue: {
        marginVertical: 4,
        color: Colors.primary,
    },
    statLabel: {
        textAlign: "center",
        color: Colors.primary,
    },
    promisesCard: {
        margin: 15,
        backgroundColor: Colors.primaryContainer,
        padding: 15,
        borderRadius: 15,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
        color: Colors.primary,
    },
    promiseItem: {
        fontSize: 14,
        color: "#333",
        marginBottom: 5,
    },
    galleryCard: {
        margin: 15,
        backgroundColor: Colors.primaryContainer,
        padding: 15,
        borderRadius: 15,
    },
    photoRow: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    photo: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },
});

export default PartnerScreen;