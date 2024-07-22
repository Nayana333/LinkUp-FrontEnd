import { useSelector } from "react-redux";
import { Edit, LocateIcon, Mail, Phone, Target, X } from "lucide-react";
import EditBio from "./EditBio";
import { useEffect, useState } from "react";
import SetUserType from "./SetUserType";
import { Tabs, Modal } from "flowbite-react";
import { getUserDetails } from '../services/api/user/apiMethods'

function UserBio() {
  const selectUser = (state: any) => state.auth.user || "";
  const user = useSelector(selectUser) || "";
  const [isEdit, setIsEdit] = useState(false);
  const [isSetUserType, setIsSetUserType] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [connections, setConnections] = useState<any>(null);
  const userId = user._id;

  const handleEditButtonClick = () => {
    setIsEdit(true);
  };

  const handleCancelEdit = () => {
    setIsEdit(false);
  };

  useEffect(() => {
    if (userId) {
      getUserDetails(userId)
        .then((response: any) => {
          const connectionData = response.data.connections;
          setConnections(connectionData);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [userId]);

  return (
    <div>
      <div>
        <div className="background w-full h-36 bg-gray-300 mt-7 rounded-t-md"></div>
        <div className="bio bg-white w-full h-96 rounded-b-md pt-16 px-10">
          <div className="flex justify-between mb-4">
            {!user.isHiring ? (
              <p className="text-xs bg-green-600 text-white py-1 mt-1 w-32 rounded-full text-center">Available for work</p>
            ) : (
              <p className="text-xs bg-white border border-green-600 font-semibold text-green-600 py-1 mt-1 w-32 rounded-full text-center">Recruiting</p>
            )}
            <button onClick={handleEditButtonClick}><Edit size={15} /></button>
          </div>
          <div className="flex gap-10">
            <p className="text-sm font-bold flex items-center gap-1">{user.profile?.fullname || user.companyProfile?.companyName} {user.isPremium && (<Target color="green" size={15} />)}</p>
            {/* <p className="text-xs">{user.userName}</p> */}
          </div>
          <div>
            <p className="text-xs mb-5">{user.profile?.designation || user.companyProfile?.companyType}</p>
            <p className="text-sm font-bold">About</p>
            <p className="text-xs w-1/2">{user.profile?.about || user.companyProfile?.aboutCompany}</p>
          </div>
          {connections && (
            <div>
              <p className="text-sm font-bold text-green-600 my-5">{connections.connections.length} Links</p>
            </div>
          )}
          <div className="flex gap-4">
            <button onClick={() => setIsSetUserType(true)} className="text-xs flex text-green-600 border px-2 py-1 rounded-md border-green-600">Open to</button>
            <button onClick={() => setOpenModal(true)} className="text-xs flex text-green-600 border px-2 py-1 rounded-md border-green-600">Add Section</button>
          </div>
        </div>
        <div className="profile-image w-32 h-32 absolute rounded-lg border-4 border-white top-60 left-56">
          <img className="rounded-md w-full h-full" src={user.profileImageUrl} alt="" />
        </div>
        <div className="contact w-full h-40 rounded-md mt-7 bg-white flex flex-col px-10 pt-10 gap-2">
          <p className="text-sm font-bold">Contact Information</p>
          <div className="flex w-full gap-32">
            <div>
              <p className="text-xs font-semibold flex items-center gap-1"><Mail size={15} /> Email</p>
              <p className="text-xs text-gray-500 mt-2">{user.email}</p>
            </div>
            <div>
              <p className="text-xs font-semibold flex items-center gap-1"><Phone size={15} /> Phone</p>
              <p className="text-xs text-gray-500 mt-2">{user.phone}</p>
            </div>
            <div>
              <p className="text-xs font-semibold flex items-center gap-1"><LocateIcon size={15} /> Location</p>
              <p className="text-xs text-gray-500 mt-2">{user.profile?.location || user.companyProfile?.companyLocation}</p>
            </div>
          </div>
        </div>
      </div>

      {isEdit && <EditBio onCancelEdit={handleCancelEdit} />}

      {isSetUserType && <SetUserType setOpenModal={setIsSetUserType} />}

      {user.userType === 'individual' && (
        <div>
          <Modal show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Body>
              <div className='flex justify-between items-center mb-3'>
                <p className='text-sm font-semibold'>Add Section</p>
                <button onClick={() => setOpenModal(false)}>
                  <X size={18} color='gray' />
                </button>
              </div>
              <Tabs className="addsection text-xs" aria-label="Tabs with icons">
                <Tabs.Item title="Experience">
                  This is <span className="font-medium text-gray-800 dark:text-white">Profile tab's associated content</span>.
                </Tabs.Item>
                <Tabs.Item className="text-xs" title="Education">
                  This is <span className="font-medium text-gray-800 dark:text-white">Dashboard tab's associated content</span>.
                </Tabs.Item>
                <Tabs.Item className="text-xs" title="Skills">
                  This is <span className="font-medium text-gray-800 dark:text-white">Settings tab's associated content</span>.
                </Tabs.Item>
                <Tabs.Item className="text-xs" title="Resume">
                  This is <span className="font-medium text-gray-800 dark:text-white">Contacts tab's associated content</span>.
                </Tabs.Item>
              </Tabs>
            </Modal.Body>
          </Modal>
        </div>
      )}

      {user.userType === 'organization' && (
        <div>
          <Modal show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Body>
              <div className='flex justify-between items-center mb-3'>
                <p className='text-sm font-semibold'>Add Section</p>
                <button onClick={() => setOpenModal(false)}>
                  <X size={18} color='gray' />
                </button>
              </div>
              <Tabs className="addsection text-xs" aria-label="Tabs with icons">
                <Tabs.Item title="Statistics">
                  This is <span className="font-medium text-gray-800 dark:text-white">Profile tab's associated content</span>.
                </Tabs.Item>
                <Tabs.Item className="text-xs" title="Benefits">
                  This is <span className="font-medium text-gray-800 dark:text-white">Dashboard tab's associated content</span>.
                </Tabs.Item>
                <Tabs.Item className="text-xs" title="socials">
                  This is <span className="font-medium text-gray-800 dark:text-white">Settings tab's associated content</span>.
                </Tabs.Item>
                <Tabs.Item className="text-xs" title="Profile">
                  This is <span className="font-medium text-gray-800 dark:text-white">Contacts tab's associated content</span>.
                </Tabs.Item>
              </Tabs>
            </Modal.Body>
          </Modal>
        </div>
      )}
    </div>
  );
}

export default UserBio;
