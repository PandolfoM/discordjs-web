const admin = require("firebase-admin");

module.exports.findUser = async (uid) => {
  let obj;
  try {
    const user = await admin
      .firestore()
      .collection("users")
      .doc(toString(uid))
      .get();
    if (!user.exists) {
      obj = { success: false, error: `user with uid ${uid} does not exist` };
    } else {
      obj = { success: true, user: user.data() };
    }
  } catch (error) {
    console.log(`SEARCH USER ERROR: ${error.message}`);
    obj = { success: false, error: error.message };
    console.log("RETURNING OBJECT:");
    console.log(obj);
  }
  return obj;
};

module.exports.newUser = async (profile) => {
  console.log(profile);
  let obj;
  try {
    const userRecord = await admin.auth().createUser(profile);
    await admin.firestore().doc(`/users/${profile.uid}`).set(profile);
    obj = { success: true, user: userRecord };
  } catch (error) {
    console.error(`Error creating a user: ${error}`);
    obj = { success: false, error: error.message };
  }
  return obj;
};
