import { useEffect, useState } from "react";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import SignOut from "./SignOut";
import ChatRoom from "./ChatRoom";

firebase.initializeApp({
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID,
    measurementId: process.env.REACT_APP_MEASUREMENTID,
  });
  
const auth = firebase.auth();
const firestore = firebase.firestore();

const RoomPage = () => {
  const [roomId, setRoomId] = useState(null);
  const [roomName, setRoomName] = useState("");
  const [formValue, setFormValue] = useState("");
  const [roomsList, setRoomsList] = useState({});

  const { uid } = auth.currentUser;

  useEffect(() => {
    const getData = async () => {
      try {
        const userRef = firestore.collection("users").doc(uid);
        const data = await userRef.get();
        const roomData = {};
        for (const key in data.data()) {
          const roomNameRef = firestore.collection("rooms").doc(key);
          const name = await roomNameRef.get();
          if (name.data()?.roomName) {
            roomData[key] = name.data().roomName;
          }
        }
        setRoomsList(roomData);
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, [roomId]);

  const JoinRoom = async (formID) => {
    if (formID === "Public") {
      setRoomId("Public");
      setRoomName("Public");
    } else if (formID !== "") {
      try {
        const messagesRef = firestore.collection("rooms").doc(formID);
        await messagesRef.get();
        const userRef = firestore.collection("users").doc(uid);
        await userRef.set(
          {
            [formID]: true,
          },
          { merge: true }
        );
        setRoomId(formID);
        const roomNameRef = firestore.collection("rooms").doc(formID);
        const name = await roomNameRef.get();
        if (name.data()?.roomName) {
          setRoomName(name.data().roomName);
        }
      } catch (err) {
        console.log(
          "Room Id not available or you do not have permissions to view the room!"
        );
      }
    }
  };

  const CreateRoom = async () => {
    const timestamp = Date.now();
    const newRoomId = `${uid}_${timestamp}`;

    if (formValue !== "") {
      try {
        const userRef = firestore.collection("users").doc(uid);
        await userRef.set(
          {
            [newRoomId]: true,
          },
          { merge: true }
        );

        const roomsRef = firestore.collection("rooms").doc(newRoomId);
        await roomsRef.set({
          isDirectMessage: false,
          isPublic: false,
          roomId: newRoomId,
          roomName: formValue,
        });

        setRoomId(newRoomId);
        setRoomName(formValue);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const LeaveRoom = async () => {
    try {
      const messagesRef = firestore.collection("rooms").doc(roomId);
      await messagesRef.get();
      const userRef = firestore.collection("users").doc(uid);
      await userRef.update({
        [roomId]: firebase.firestore.FieldValue.delete(),
      });
      setRoomId(null);
      setRoomName("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {roomId == null && (
        <>
          <button onClick={() => CreateRoom()}>Create Room</button>
          <button onClick={() => JoinRoom(formValue)}>Join Room</button>
          <div style={{ color: "white" }}>
            <div>HINT: Write "Public" to join the public room open to all</div>
            <div>
              To join a room, type in ID of room and click on "Join Room"
              button.
            </div>
            <div>
              To create a room, type in a name for your room and click on
              "Create Room" button. Room Id is created automatically.
            </div>
            <div>List of Rooms you have joined or created are below:</div>
          </div>
          <div>
            {roomsList &&
              Object.entries(roomsList).map(([key, value]) => (
                <button onClick={() => JoinRoom(key)} key={key}>
                  {value}
                </button>
              ))}
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)}
              placeholder="Write Room Name or ID"
            />
          </form>
        </>
      )}
      {roomId != null && (
        <>
          <header>
            <button className="RoomName">{roomName}</button>
            <button onClick={() => setRoomId(null)}>Go Back</button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(roomId);
              }}
              title="Click this button to copy room Id to clipboard"
            >
              Copy Room ID
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(uid);
              }}
              title="Click this button to copy your user Id to clipboard"
            >
              Copy User ID
            </button>
            <button onClick={LeaveRoom}>Leave Room</button>
            <SignOut />
          </header>
          <ChatRoom roomId={roomId} />
        </>
      )}
    </>
  );
};

export default RoomPage;
