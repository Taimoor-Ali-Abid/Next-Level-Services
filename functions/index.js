const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.sendMessageNotification = functions.database
  .ref('/groups/{groupId}/messages/{messageId}')
  .onCreate(async (snapshot, context) => {
    const message = snapshot.val();
    const groupId = context.params.groupId;

    const groupMembersSnap = await admin.database().ref(`/groups/${groupId}/members`).once('value');
    const members = groupMembersSnap.val() || {};

    const tokens = [];
    for (const uid of Object.keys(members)) {
      if (uid !== message.senderId) {
        const tokenSnap = await admin.database().ref(`/users/${uid}/fcmToken`).once('value');
        const token = tokenSnap.val();
        if (token) tokens.push(token);
      }
    }

    const payload = {
      notification: {
        title: `${message.senderName}`,
        body: message.text,
      },
    };

    if (tokens.length > 0) {
      return admin.messaging().sendToDevice(tokens, payload);
    } else {
      return null;
    }
  });
