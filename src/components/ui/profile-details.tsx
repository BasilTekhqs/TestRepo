import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

type Props = {
  title: string;
  description: string;
  ChangePass: () => void;
};

export const ProfileDetailsCard = ({title, description, ChangePass}: Props) => {
  return (
    <View style={styles.mainView}>
      <View style={styles.inner}>
        <Text style={styles.titleText}>{title}</Text>
        {description === 'Change Password' ? (
          <TouchableOpacity onPress={ChangePass}>
            <Text style={styles.desText}>{description}</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.desView}>
            <Text style={styles.desText}>{description}</Text>
          </View>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mainView: {
    borderBottomWidth: 0.2,
    width: '95%',
    marginVertical: 12,
    alignSelf: 'center',
  },
  inner: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 7,
  },
  titleText: {
    fontSize: 13,
    fontWeight: '400',
  },
  desText: {
    fontSize: 13,
    fontWeight: '300',
    textAlign: 'right',
  },
  desView: {
    width: 140,
    alignItems: 'flex-end',
  },
});
