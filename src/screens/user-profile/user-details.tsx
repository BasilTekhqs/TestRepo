import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Image} from 'native-base';
import MainWithHeader from '../../components/layouts/main-with-header';
import {ProfileDetailsCard} from '../../components/ui/profile-details';
import {NavigationButton} from '../../components/ui/button';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {UserProfileStackParamList} from '../../navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

type Props = StackNavigationProp<UserProfileStackParamList, 'UserDetails'>;

const UserDetails = () => {
  const navigation = useNavigation<Props>();
  const [img, setImage] = useState(
    'https://randomuser.me/api/portraits/men/76.jpg',
  );
  const [name, setName] = useState('John Smith');
  const [email, setEmail] = useState('johnsmith@sucasa.uk');
  const [contactno, setContactno] = useState('+44 7711223344');
  const [password, setPassword] = useState('Change Password');
  const [currentAdd, setCurrentAdd] = useState(
    '123 Clean Street Menchester\nM1 1DD',
  );

  return (
    <MainWithHeader onClickBack={() => navigation.goBack()}>
      <View style={styles.userStyle}>
        <Image source={{uri: img}} style={styles.imageStyle} />
        <Text style={styles.name}>{name}</Text>
        <View style={styles.landButton}>
          <Text style={styles.landStyle}>{'Landlord - Verified'}</Text>
        </View>
      </View>
      <View style={styles.body}>
        <ProfileDetailsCard
          title="Title"
          description="Mr"
          ChangePass={() => {}}
        />
        <ProfileDetailsCard
          title="Full Name"
          description={name}
          ChangePass={() => {}}
        />
        <ProfileDetailsCard
          title="Email"
          description={email}
          ChangePass={() => {}}
        />
        <ProfileDetailsCard
          title="Contact Number"
          description={contactno}
          ChangePass={() => {}}
        />
        <ProfileDetailsCard
          title="Password"
          description={password}
          ChangePass={() => {
            navigation.navigate('ChangePass');
          }}
        />
        <ProfileDetailsCard
          title="Current Address"
          description={currentAdd}
          ChangePass={() => {}}
        />
        <NavigationButton
          text="Edit"
          btnStyle={styles.buttonStyle}
          txtStyle={{}}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.space} />
    </MainWithHeader>
  );
};
export default UserDetails;
const styles = StyleSheet.create({
  imageStyle: {
    height: 80,
    width: 80,
    borderRadius: 80,
  },
  userStyle: {
    alignItems: 'center',
  },
  name: {
    fontSize: 13,
    marginTop: 5,
    fontWeight: '400',
  },
  landButton: {
    backgroundColor: '#429EA6',
    marginTop: 10,
    borderRadius: 7,
  },
  landStyle: {
    marginVertical: 5,
    marginHorizontal: 10,
  },
  body: {
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#FD9926',
  },
  buttonStyle: {
    backgroundColor: '#FD9926',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  space: {
    height: responsiveHeight(20),
  },
});
