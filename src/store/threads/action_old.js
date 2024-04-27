// import api from '../../data/network-api';
//
// const ActionType = {
//   ADD_THREAD: 'ADD_THREAD',
//   TOGGLE_LIKE_THREAD: 'TOGGLE_LIKE_THREAD',
// };
//
//
//
//
// function addThreadActionCreator(thread) {
//   return {
//     type: ActionType.ADD_THREAD,
//     payload: {
//       thread,
//     },
//   };
// }
//
// function toggleLikeThreadActionCreator({ threadId, userId }) {
//   return {
//     type: ActionType.TOGGLE_LIKE_THREAD,
//     payload: {
//       threadId,
//       userId,
//     },
//   };
// }
//
// function asyncAddThread({ text, replyTo = '' }) {
//   return async (dispatch) => {
//     try {
//       const thread = await api.createThread({ text, replyTo });
//       dispatch(addThreadActionCreator(thread));
//     } catch (error) {
//       alert(error.message);
//     }
//   };
// }
//
//
// function asyncToogleLikeThread(threadId) {
//   return async (dispatch, getState) => {
//     const { authUser } = getState();
//     dispatch(toggleLikeThreadActionCreator({ threadId, userId: authUser.id }));
//
//     try {
//       await api.toggleLikeThread(threadId);
//     } catch (error) {
//       alert(error.message);
//       dispatch(toggleLikeThreadActionCreator({ threadId, userId: authUser.id }));
//     }
//   };
// }
// export {
//   ActionType,
//   addThreadActionCreator,
//   toggleLikeThreadActionCreator,
//   asyncAddThread,
//   asyncToogleLikeThread,
// };
//
