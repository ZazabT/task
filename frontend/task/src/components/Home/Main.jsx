// import  { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEdit, faTrashAlt, faThumbtack, faCheckCircle, faPlus } from '@fortawesome/free-solid-svg-icons';

// const Main = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [editMode, setEditMode] = useState(false); // Flag for edit mode
//   const [modalData, setModalData] = useState({ title: '', description: '' });

//   const cards = [
//     { id: 1, title: 'Card 1', description: 'Description for card 1' },
//     { id: 2, title: 'Card 2', description: 'Description for card 2' },
//     { id: 3, title: 'Card 3', description: 'Description for card 3' },
//   ];

//   const handleAddClick = () => {
//     setEditMode(false); // Set to add mode
//     setModalData({ title: '', description: '' }); // Clear modal data
//     setShowModal(true);
//   };

//   const handleEditClick = (card) => {
//     setEditMode(true); // Set to edit mode
//     setModalData({ title: card.title, description: card.description }); // Set modal data
//     setShowModal(true);
//   };

//   const handleModalClose = () => {
//     setShowModal(false);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setModalData(prevData => ({ ...prevData, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle submit logic for adding or editing
//     console.log(editMode ? 'Editing:' : 'Adding:', modalData);
//     setShowModal(false);
//   };

//   return (
//     <div className="flex flex-col h-full p-4">
//       {/* Search Bar */}
//       <div className="mb-4 text-gray-700">
//         <input
//           type="text"
//           placeholder="Search..."
//           className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       {/* Cards Section */}
//       <div className="flex flex-wrap gap-4 mb-4">
//         {cards.map((card) => (
//           <div
//             key={card.id}
//             className="bg-white shadow-lg rounded-lg p-4 w-full md:w-1/3 lg:w-1/4 flex flex-col"
//           >
//             <h2 className="text-xl font-bold mb-2">{card.title}</h2>
//             <p className="text-gray-600 mb-4">{card.description}</p>
//             <div className="flex gap-2 mt-auto">
//               <button className="text-blue-500 hover:text-blue-700" onClick={() => handleEditClick(card)}>
//                 <FontAwesomeIcon icon={faEdit} />
//               </button>
//               <button className="text-red-500 hover:text-red-700">
//                 <FontAwesomeIcon icon={faTrashAlt} />
//               </button>
//               <button className="text-yellow-500 hover:text-yellow-700">
//                 <FontAwesomeIcon icon={faThumbtack} />
//               </button>
//               <button className="text-green-500 hover:text-green-700">
//                 <FontAwesomeIcon icon={faCheckCircle} />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Add Button */}
//       <div className="mt-auto flex justify-center">
//         <button className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full flex items-center" onClick={handleAddClick}>
//           <FontAwesomeIcon icon={faPlus} className="mr-2" />
//           Add
//         </button>
//       </div>

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-md">
//             <h2 className="text-2xl font-bold mb-4">{editMode ? 'Edit Task' : 'Add Task'}</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-4">
//                 <label className="block text-gray-700 mb-2" htmlFor="title">Task Title</label>
//                 <input
//                   type="text"
//                   id="title"
//                   name="title"
//                   value={modalData.title}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border rounded-lg"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700 mb-2" htmlFor="description">Description</label>
//                 <textarea
//                   id="description"
//                   name="description"
//                   value={modalData.description}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border rounded-lg"
//                   rows="4"
//                 />
//               </div>
//               <div className="flex justify-end">
//                 <button type="button" onClick={handleModalClose} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
//                 <button type="submit" className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded">Save</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Main;
