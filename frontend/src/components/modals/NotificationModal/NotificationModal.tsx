// import {FC} from "react";
// import {Link} from "react-router-dom";
//
// export const NotificationModal: FC = () => {
//     const notifications: Notification[] = [];
//
//     const getNotifTypeFromObject = (notificationType: string): string => {
//         switch (notificationType) {
//             case "like":
//                 return "liked your photo";
//             case "comment":
//                 return "commented your photo";
//             case "follow":
//                 return "started following";
//             default:
//                 return "started following";
//         }
//     }
//
//     return (
//         <div>
//             <h2>Notifications</h2>
//             <h3>New</h3>
//             <ul>
//                 {notifications.length > 0 ? notifications.map((notification) => (
//                     <Link to={notification?.url} >
//                         <div>
//                             <img src={notification?.author.avatar} alt={notification?.author.avatar}/>
//                             <p>{notification?.author.username} {getNotifTypeFromObject(notification?.notificationType)}</p>
//                             <p>{notification?.date}</p>
//                         </div>
//                         <div>
//                             <img src={notification?.post.image} alt={notification?.post.image}/>
//                         </div>
//                     </Link>
//                 )) : (
//                     <h3>No Notifications</h3>
//                 )}
//             </ul>
//
//         </div>
//     );
// };