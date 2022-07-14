import {
  BillingDetails,
  CardField,
  useConfirmPayment,
  CardFieldInput,
} from '@stripe/stripe-react-native';
import React, {useState} from 'react';
import {
  Alert,
  StyleSheet,
  View,
  Button,
  Switch,
  Text,
  TextInput,
} from 'react-native';
import PaymentScreen from './PaymentScreen';
import {makeStripePayment} from '../../backend/api';
import {useSelector} from 'react-redux';

type Props = {
  service: string;
};
export default async function MultilineWebhookPaymentScreen({service}: Props) {
  const [saveCard, setSaveCard] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({});
  const [saleInfo, setSaleInfo] = useState();
  const {userId} = useSelector((state: any) => state.user);

  const [email, setEmail] = useState(userId.email);
  const {confirmPayment, loading} = useConfirmPayment();

  const handlePayPress = async () => {
    try {
      const billingDetails: BillingDetails = customerInfo;

      const {clientSecret} = await makeStripePayment({
        service,
        saleInfo,
      });
      const {error, paymentIntent} = await confirmPayment(
        clientSecret,
        {
          paymentMethodType: 'Card',
          paymentMethodData: {
            billingDetails,
          },
        },
        {
          setupFutureUsage: saveCard ? 'OffSession' : undefined,
        },
      );
      if (error) {
        Alert.alert(`Error code: ${error.code}`, error.message);
      } else if (paymentIntent) {
        Alert.alert(
          'Success',
          `The payment was confirmed successfully! currency: ${paymentIntent.currency}`,
        );
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <PaymentScreen>
      <TextInput
        autoCapitalize="none"
        placeholder="E-mail"
        keyboardType="email-address"
        value={email}
        onChange={value => setEmail(value.nativeEvent.text)}
        style={styles.input}
      />
      <CardField
        postalCodeEnabled={false}
        autofocus
        placeholders={{
          number: '4242 4242 4242 4242',
          postalCode: '12345',
          cvc: 'CVC',
          expiration: 'MM|YY',
        }}
        cardStyle={inputStyles}
        style={styles.cardField}
      />
      <View style={styles.row}>
        <Switch onValueChange={value => setSaveCard(value)} value={saveCard} />
        <Text style={styles.text}>Save card during payment</Text>
      </View>
      <Button
        onPress={handlePayPress}
        title="Pay"
        accessibilityLabel="Pay"
        disabled={loading}
      />
    </PaymentScreen>
  );
}

const styles = StyleSheet.create({
  cardField: {
    width: '100%',
    height: 50,
    marginVertical: 30,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    marginLeft: 12,
  },
  input: {
    height: 44,
    borderBottomColor: 'grey',
    borderBottomWidth: 1.5,
  },
});

const inputStyles: CardFieldInput.Styles = {
  borderWidth: 1,
  backgroundColor: '#FFFFFF',
  borderColor: '#000000',
  borderRadius: 8,
  fontSize: 14,
  placeholderColor: '#A020F0',
  textErrorColor: '#ff0000',
};
