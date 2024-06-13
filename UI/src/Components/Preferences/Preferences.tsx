import React, { useState } from 'react';
import './Preferences.css'
import { Modal } from 'flowbite-react';
import { User, Users, BriefcaseBusiness, UserRoundPlus } from 'lucide-react';
import { toast } from 'sonner';
import { useSelector, useDispatch } from 'react-redux';
import { postPreferences } from '../../services/api/user/apiMethods';
import { updateUser } from '../../utils/context/reducers/authSlice';

const Preferences = () => {
  const userSelect = (state: any) => state.auth.user || '';
  const user = useSelector(userSelect);
  const userId = user._id;
  const dispatch = useDispatch();
  const [isHiring, setHiring] = useState('');
  const [userType, setUserType] = useState('');

  const handleTypeSelection = (type: string) => {
    setUserType(type);
  };

  const handleStatusSelection = (status: string) => {
    setHiring(status);
  };

  const handleSave = () => {
    if (isHiring && userType) {
      postPreferences({ userId, userType, isHiring })
        .then((response: any) => {
          const data = response.data;
          if (response.status === 200) {
            console.log(response.message);
            
            toast.success(response.message);
            dispatch(updateUser({ user: data }));
          } else {
            toast.error(response.error);
          }
        })
        .catch((error) => {
          console.log(error?.message);
          toast.error(error?.message);
        });
    }
  };

 return (
    <div className="overlay">
      <div className="modalContainer">
        <div className="modalBody">
          <h3><b>Basic Information</b></h3>
        </div>
        <div className="modalFooter">
          <div className="content">
            <p className="question">
              Are you an individual person/person representing a company or an organization?
            </p>
            <div className="buttonGroup">
              <button
                className="button"
                style={{ backgroundColor: userType === 'individual' ? '#c6f6d5' : '' }}
                onClick={() => handleTypeSelection('individual')}
              >
                <div className="buttonContent">
                  <User color="black" size={18} /> Individual
                </div>
              </button>
              <button
                className="button"
                style={{ backgroundColor: userType === 'organization' ? '#c6f6d5' : '' }}
                onClick={() => handleTypeSelection('organization')}
              >
                <div className="buttonContent">
                  <Users color="black" size={18} /> Organization
                </div>
              </button>
            </div>
            <p className="question">
              Are you looking for a job or planning to hire an individual?
            </p>
            <div className="buttonGroup">
              <button
                className="button"
                style={{ backgroundColor: isHiring === 'openToWork' ? '#c6f6d5' : '' }}
                onClick={() => handleStatusSelection('openToWork')}
              >
                <div className="buttonContent">
                  <BriefcaseBusiness color="black" size={18} /> Open to Work
                </div>
              </button>
              <button
                className="button"
                style={{ backgroundColor: isHiring === 'isHiring' ? '#c6f6d5' : '' }}
                onClick={() => handleStatusSelection('isHiring')}
              >
                <div className="buttonContent">
                  <UserRoundPlus color="black" size={18} /> Is Hiring
                </div>
              </button>
            </div>
          </div>
          <div className="footer">
            <button className="saveButton" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preferences;
