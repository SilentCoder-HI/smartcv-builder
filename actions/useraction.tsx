"use server"
import connectDB from "@/lib/db";
import User from "@/model/user";

// Send all user data
export async function sendAllUserData() {
  try {
    await connectDB();

    const users = await User.find({}).lean();
    console.log(users)
    const plainUsers = users.map((user: any) => ({
      ...user,
      _id: user._id.toString(), // Convert ObjectId to string
    }));

    return plainUsers; // ✅ Return actual array
  } catch (error) {
    console.error("❌ Failed to fetch users:", error);
    return null;
  }
}


// //Send User data by userID
// export async function userDatabyID(userid) {
//     try {
//         await connectDB();
//         const user = await User.findOne({ userId: userid }).lean();
//         if (!user) {
//             return null;
//         }
//         const plainUser = {
//             ...user,
//             _id: user._id.toString(),
//             friendList: user.friendList.map(friend => ({
//                 ...friend,
//                 _id: friend._id.toString(),
//                 timestamp: friend.timestamp.toISOString()
//             })),
//             friendRequests: user.friendRequests.map(request => ({
//                 ...request,
//                 _id: request._id.toString(),
//                 timestamp: request.timestamp.toISOString()
//             }))
//         };
//         return plainUser;
//     } catch (error) {
//         console.error(error);
//         return null;
//     }
// }

// // update user data
// export async function updateUser(form, email) {
//     try {
//         await connectDB();
//         const updatedUser = await User.findOneAndUpdate({ email: form.email }, form, { new: true });

//         // Update username in UserPayment
//         await UserPayment.findOneAndUpdate(
//             { userid: form.userid },
//             { $set: { name: form.name } },
//             { new: true }
//         );

//         // Update sender name in all UserPayment documents where this user is the sender
//         await UserPayment.updateMany(
//             { "payments.senderEmail": form.email },
//             { $set: { "payments.$[elem].senderName": form.name } },
//             { arrayFilters: [{ "elem.senderEmail": form.email }] }
//         );

//     } catch (error) {
//         console.error("Error updating user:", error);
//         throw error; // Propagate the error to be handled by the caller
//     }
// }

// //Save USer payments 
// export async function saveUserPayments(userid, payment) {
//     try {
//         await connectDB();
//         const existingPayment = await UserPayment.findOne({ userId: userid });

//         if (existingPayment) {
//             // If user exists, push new payment to payments array
//             existingPayment.payments.push({
//                 paymentNum: existingPayment.payments.length + 1,
//                 senderEmail: payment.senderEmail,
//                 senderName: payment.senderName,
//                 amount: payment.amount,
//                 currency: payment.currency,
//                 message: payment.message,
//                 timestamp: new Date()
//             });
//             await existingPayment.save();
//         } else {
//             // If user doesn't exist, create new document with payment
//             const newUserPayment = new UserPayment({
//                 userid: userid,
//                 name: payment.receiverName,
//                 payments: [{
//                     paymentNum: 1,
//                     senderEmail: payment.senderEmail,
//                     senderName: payment.senderName,
//                     amount: payment.amount,
//                     currency: payment.currency,
//                     message: payment.message,
//                     timestamp: new Date()
//                 }]
//             });
//             await newUserPayment.save();
//         }

//         return { success: true, message: "Payment saved successfully" };
//     } catch (error) {
//         console.error("Error saving payment:", error);
//         return { success: false, message: "Error saving payment" };
//     }
// }

// // Send ALL User Data
// export async function sendAllUsersData(userId) {
//     try {
//         await connectDB();
//         // Fetch all users
//         const allUsers = await User.find().lean();
//         const plainUsers = allUsers
//             .map(user => ({
//                 userId: user.userId,
//                 name: user.name,
//                 username: user.username,
//                 email: user.email,
//                 profilePic: user.profilePic
//             }));
//         const filterUSer = plainUsers.filter(user => user.userId !== userId);
//         return filterUSer;
//     } catch (error) {
//         console.error("Error fetching user data:", error);
//         return { success: false, message: "Error fetching user data" };
//     }
// }

// //Handle User friendRequests
// export async function handleUserFriendRequests(requestSender, receiveruser) {
//     try {
//         console.log(requestSender, receiveruser);
//         const SenderUser = await User.findOne({ userId: requestSender });

//         const plainUser = {
//             userId: SenderUser.userId,
//             name: SenderUser.name,
//             username: SenderUser.username,
//             email: SenderUser.email,
//             profilePic: SenderUser.profilePic
//         };
//         const ReceiverUser = await User.findOne({ userId: receiveruser });

//         if (ReceiverUser) {
//             ReceiverUser.friendRequests.push(plainUser);
//             await ReceiverUser.save();
//             console.log("Friend request sent");
//             return { success: true, message: "Friend request sent successfully" };
//         } else {
//             return { success: false, message: "User not found" };
//         }
//     } catch (error) {
//         console.error("Error handling friend request:", error);
//         return { success: false, message: "Error handling friend request" };
//     }
// }
// //Show Request Notification

// export async function showRequestNotification(userId) {
//     try {
//         const user = await User.findOne({ userId: userId });
//         if (!user) {
//             return [];
//         }
//         const plainRequests = user.friendRequests.map(request => ({
//             userId: request.userId,
//             name: request.name,
//             username: request.username,
//             profilePic: request.profilePic,
//             timestamp: request.timestamp.toISOString()
//         }));
//         return plainRequests;
//         // return plainUser;
//     } catch (error) {
//         console.error("Error fetching friend requests:", error);
//         return [];
//     }
// }
// //Accept Friend Request or Remove Request
// export async function acceptOrRemoveFriendRequest(currentUserId, requestSenderId, action) {
//     try {
//         // User that received the request
//         const currentUser = await User.findOne({ userId: currentUserId });
//         // User that sent the request
//         const requestSender = await User.findOne({ userId: requestSenderId });

//         if (!currentUser || !requestSender) {
//             throw new Error("One or both users not found");
//         }
//         if (action === "accept") {
//             currentUser.friendList.push(requestSender);
//             currentUser.friendRequests = currentUser.friendRequests.filter(request => request.userId !== requestSenderId);
//             await currentUser.save();
//             requestSender.friendList.push(currentUser);
//             requestSender.friendRequests = requestSender.friendRequests.filter(request => request.userId !== currentUserId);
//             await requestSender.save();
//             const chatId = `${Math.floor(Math.random() * 1000000000)}`;
//             const newChat = new Chat({
//                 chatId: chatId,
//                 users1: currentUserId,
//                 users2: requestSenderId,
//                 messages: []
//             });
//             await newChat.save();
//             return { success: true, message: "Friend request accepted" };
//         }
//         else if (action === "remove") {
//             currentUser.friendRequests = currentUser.friendRequests.filter(request => request.userId !== requestSenderId);
//             await currentUser.save();
//             requestSender.friendRequests = requestSender.friendRequests.filter(request => request.userId !== currentUserId);
//             await requestSender.save();
//             return { success: true, message: "Friend request removed" };
//         }
//     } catch (error) {
//         console.error("Error handling friend request:", error);
//         return { success: false, message: "Error handling friend request" };
//     }
// }
// //show friend list
// export async function showFriendList(userId) {
//     try {
//         const user = await User.findOne({ userId: userId });
//         if (!user) {
//             return [];
//         }
//         const plainFriends = user.friendList.map(friend => ({
//             userId: friend.userId,
//             name: friend.name,
//             username: friend.username,
//             profilePic: friend.profilePic,
//             timestamp: friend.timestamp.toISOString()
//         }));
//         return plainFriends;
//     } catch (error) {
//         console.error("Error fetching friend list:", error);
//         return [];
//     }
// }
// //Show User Chats
// export async function showUserChats(userId) {
//     try {
//         const chats = await Chat.find({ users1: userId }).lean();
//         console.log(chats);
//     } catch (error) {
//         console.error("Error fetching chats:", error);
//         return [];
//     }
// }
// //Send chatId
// export async function sendChatId(user1, user2) {
//     try {
//         const chat = await Chat.findOne({ users1: user2, users2: user1 });
//         if (!chat) {
//             console.log("No chat found");
//             const chat = await Chat.findOne({ users1: user1, users2: user2 });
//             if (!chat) {
//                 return null; // Return null if no chat is found
//             }
            
//             const plainChat = {
//                 chatId: chat.chatId,
//                 users1: chat.users1,
//                 users2: chat.users2,
//                 lastMessage: chat.lastMessage ? chat.lastMessage.toISOString() : null,
//                 createdAt: chat.createdAt ? chat.createdAt.toISOString() : null,
//                 updatedAt: chat.updatedAt ? chat.updatedAt.toISOString() : null,
//                 messages: chat.messages ? chat.messages.map(msg => ({
//                     sender: msg.sender,
//                     content: msg.content,
//                     timestamp: msg.timestamp ? msg.timestamp.toISOString() : null
//                 })) : []
//             };

//             return plainChat;
//         }
//         else {
//             console.log("Chat found");
//             // Convert the chat document to a plain JavaScript object
//             const plainChat = {
//                 chatId: chat.chatId,
//                 users1: chat.users1,
//                 users2: chat.users2,
//                 lastMessage: chat.lastMessage ? chat.lastMessage.toISOString() : null,
//                 createdAt: chat.createdAt ? chat.createdAt.toISOString() : null,
//                 updatedAt: chat.updatedAt ? chat.updatedAt.toISOString() : null,
//                 messages: chat.messages ? chat.messages.map(msg => ({
//                     sender: msg.sender,
//                     content: msg.content,
//                     timestamp: msg.timestamp ? msg.timestamp.toISOString() : null
//                 })) : []
//             };
//             return plainChat;
//         }
//     } catch (error) {
//         console.error("Error fetching chat:", error);
//         return null;
//     }
// }
// // Save and Show User Chats
// export async function saveAndShowUserChats(senderId, message, chatId) {
//     console.log(senderId , message, chatId);
//     try {
//         await connectDB();
//         // Generate a unique chatId
//         const chat = await Chat.findOne({ chatId: chatId });
//         if (chat) {
//             chat.messages.push({
//                 sender: senderId,
//                 content: message,
//                 timestamp: new Date()
//             });
//             await chat.save();
//         }
//         else{
//             console.log("No chat found");
//         }
//     } catch (error) {
//         console.error("Error in saveAndShowUserChats:", error);
//         return { success: false, message: "Error in saveAndShowUserChats" };
//     }
    
// }