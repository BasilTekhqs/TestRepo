import React, {useState} from 'react';
import {Box, Text, View} from 'native-base';
import {Platform, StyleSheet, TouchableOpacity} from 'react-native';
import {FontFamily} from '../../utils/fontDetails';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

type Props = {
  title?: string;
  onChange: (e: any) => void;
};

export const DatePicker = ({title, onChange}: Props) => {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <View style={styles.main}>
      <Text style={styles.textStyles}>
        {title ? title : 'Please enter your certificate issue date'}
      </Text>
      <Box flexDirection={'row'}>
        <TouchableOpacity
          style={styles.mainView}
          onPress={() => {
            setOpen(true);
          }}
        >
          <>
            <DateTimePickerModal
              isVisible={open}
              mode="date"
              display="spinner"
              onConfirm={d => {
                onChange(d);
                setSelectedDate(moment(d).format('DD-MM-YYYY'));
                setOpen(false);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
            <Text style={styles.dateStyle}>{selectedDate}</Text>
          </>
        </TouchableOpacity>
      </Box>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyles: {
    fontSize: 14,
    fontFamily: FontFamily.bold,
  },
  mainView: {
    width: Platform.OS === 'android' ? responsiveWidth(80) : responsiveWidth(90),
    backgroundColor: '#E5E5E5',
    height: responsiveHeight(6.5),
    marginTop: 10,
    borderRadius: 10,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  dateStyle: {
    fontSize: 14,
    fontFamily: FontFamily.bold,
    fontWeight: '600',
  },
  main:{
    alignSelf:'center'
  }
});
