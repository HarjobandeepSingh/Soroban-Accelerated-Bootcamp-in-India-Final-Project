import { TransactionBuilder, Operation, Asset, Keypair } from 'stellar-sdk';

const contractKey = 'CBXEE3AKZFJJCDEIDP6VUBVDCDVTAKYI3TPOZVJ2HJYCGPOYUSLKRVTJ';
const account = 'GASVYVVQMW4F35QDC5KGJTM5L7OTISRF37UCECPSCKKDRECSVXHBXOTX';
const secret = 'SAMWRWCT4AF7SMDTRROTLK5WU6EWKLU2BLAXQPZQTTOAVJJO3UESGRWV';

const keypair = Keypair.fromSecret(secret);

export const createCapsule = async (description, unlockTimestamp, metadata, imageHash) => {
  const transaction = new TransactionBuilder(account, {
    fee: 100,
    networkPassphrase: 'Test SDF Network ; September 2015',
  })
    .addOperation(
      Operation.manageData({
        source: account,
        data: {
          description,
          unlockTimestamp,
          metadata,
          imageHash,
        },
      }),
    )
    .setTimeout(0)
    .build();

  transaction.sign(keypair);

  try {
    const response = await fetch('https://horizon-testnet.stellar.org/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `tx=${transaction.toXDR()}`,
    });
    const result = await response.json();
    return result.id;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getCapsule = async (id) => {
  try {
    const response = await fetch(`https://horizon-testnet.stellar.org/accounts/${account}/data/capsule-${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getCapsuleIds = async () => {
  try {
    const response = await fetch(`https://horizon-testnet.stellar.org/accounts/${account}/data/capsule-ids`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};