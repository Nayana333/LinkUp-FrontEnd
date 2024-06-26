import { useRef, useState } from "react";
import { Modal } from "flowbite-react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { logged, updateUser } from "../utils/context/reducers/authSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import { basicFormValidationSchema, basicFormCompanyValidationSchema } from "../utils/validation/basicInformInitialValues";
import axios from "axios";
import { setBasicInformation } from "../services/api/user/apiMethods";

function EditBio({ onCancelEdit }: any) {
  const selectUser = (state: any) => state.auth.user || "";
  const user = useSelector(selectUser) || "";
  const userId = user._id || "";
  const dispatch = useDispatch();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const basicFormInitialValues = {
    image: "",
    fullname: user.profile?.fullname,
    location: user.profile?.location,
    designation: user.profile?.designation,
    dateOfBirth: user.profile?.dateOfBirth ? new Date(user.profile.dateOfBirth).toISOString().slice(0, 10) : "",
    phone: user.phone,
    gender: user.profile?.gender,
    about: user.profile?.about,
  };

  const basicFormCompanyInitialValues = {
    image: "",
    fullname: user.companyProfile?.companyName,
    location: user.companyProfile?.companyLocation,
    establishedOn: user.companyProfile?.establishedOn ? new Date(user.companyProfile.establishedOn).toISOString().slice(0, 10) : "",
    phone: user.phone,
    noOfEmployees: user.companyProfile?.noOfEmployees,
    about: user.companyProfile?.aboutCompany,
    companyType: user.companyProfile?.companyType,
  };

  const BasicFormHandleSubmit = async (values: any) => {
    const { image, fullname, designation, location, dateOfBirth, phone, gender, about } = values;

    try {
      let imageUrl = "";
      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "ctmfcyuf");

        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dngp3n0ql/image/upload",
          formData
        );

        if (uploadRes.status === 200) {
          imageUrl = uploadRes.data.secure_url;
        } else {
          throw new Error("Failed to upload image.");
        }
      }

      await setBasicInformation({ userId, imageUrl, fullname, designation, location, dateOfBirth, phone, gender, about })
        .then((response: any) => {
          onCancelEdit(false);
          const data = response.data;
          if (response.status === 200) {
            dispatch(logged({ user: data }));
            toast.success(data.message);
          } else {
            console.log(response.message);
            toast.error(data.message);
          }
        })
        .catch((error: any) => {
          toast.error(error?.message);
          console.log(error?.message);
        });
    } catch (error) {
      console.log(error);
      toast.error("Failed to update basic information.");
    }
  };

  const BasicFormCompanyHandleSubmit = async (values: any) => {
    const { image, fullname, companyType, location, noOfEmployees, phone, establishedOn, about } = values;

    try {
      let imageUrl = "";
      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "ctmfcyuf");

        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dngp3n0ql/image/upload",
          formData
        );

        if (uploadRes.status === 200) {
          imageUrl = uploadRes.data.secure_url;
        } else {
          throw new Error("Failed to upload image.");
        }
      }

      await setBasicInformation({ userId, imageUrl, fullname, companyType, location, noOfEmployees, phone, establishedOn, about })
        .then((response: any) => {
          onCancelEdit(false);
          const data = response.data;
          if (response.status === 200) {
            dispatch(updateUser({ user: data }));
            toast.success(data.message);
          } else {
            console.log(response.message);
            toast.error(data.message);
          }
        })
        .catch((error: any) => {
          toast.error(error?.message);
          console.log(error?.message);
        });
    } catch (error) {
      console.log(error);
      toast.error("Failed to update basic information.");
    }
  };

  return (
    <div>
      <Modal show={true}>
        <Modal.Body>
          <p className="text-sm font-semibold">Basic Information</p>
        </Modal.Body>

        {user.userType == "individual" && (
          <Modal.Footer className="flex items-start">
            <Formik
              initialValues={basicFormInitialValues}
              validationSchema={basicFormValidationSchema}
              onSubmit={BasicFormHandleSubmit}
            >
              {(formik) => (
                <Form className="flex w-full">
                  <div className="w-1/3 flex items-center flex-col ">
                    <div className="flex flex-col text-gray-500 mt-4 gap-4">
                      <Field name="image">
                        {({ field }: any) => (
                          <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={(e) => {
                              const files = e.target.files;
                              if (files && files.length > 0) {
                                formik.setFieldValue("image", files[0]);
                                setImagePreview(URL.createObjectURL(files[0]));
                              }
                            }}
                          />
                        )}
                      </Field>
                      <div className="flex items-center justify-center ">
                        {imagePreview ? (
                          <div className="w-28 h-28 flex flex-col gap-10 items-center border rounded-full">
                            <img className="w-28 h-28 rounded-full" src={imagePreview} alt="" />
                          </div>
                        ) : (
                          <div className="w-28 h-28 flex flex-col gap-10 items-center border rounded-full">
                            <img className="w-28 h-28 rounded-full" src={user.profileImageUrl} alt="" />
                          </div>
                        )}
                      </div>
                      <div>
                        <button
                          className="text-xs border px-5 py-2 rounded-md"
                          type="button"
                          onClick={() => {
                            fileInputRef.current?.click();
                          }}
                        >
                          Choose Image
                        </button>
                        <ErrorMessage name="image" component="p" className="text-red-600 text-xs" />
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="flex gap-2">
                      <div className="w-full">
                        <Field
                          type="text"
                          id="fullname"
                          placeholder="Full Name"
                          name="fullname"
                          className="mt-5 text-xs p-3 w-full border border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300"
                        />
                        <ErrorMessage name="fullname" component={TextError} />
                      </div>
                      <div className="w-1/3">
                        <Field
                          type="text"
                          id="location"
                          placeholder="Location"
                          name="location"
                          className="mt-5 text-xs p-3 w-full border border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300"
                        />
                        <ErrorMessage name="location" component={TextError} />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <div className="w-full">
                        <Field
                          type="text"
                          id="designation"
                          placeholder="Designation"
                          name="designation"
                          className="mt-5 text-xs p-3 w-full border border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300"
                        />
                        <ErrorMessage name="designation" component={TextError} />
                      </div>

                      <div className="w-full">
                        <Field
                          type="date"
                          id="dateOfBirth"
                          placeholder="Date of Birth"
                          name="dateOfBirth"
                          className="text-gray-500 mt-5 text-xs p-3 w-full border border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300"
                        />
                        <ErrorMessage name="dateOfBirth" component={TextError} />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-full">
                        <Field
                          type="text"
                          id="phone"
                          placeholder="Phone"
                          name="phone"
                          className="mt-5 text-xs p-3 w-full border border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300"
                        />
                        <ErrorMessage name="phone" component={TextError} />
                      </div>
                      <div className="w-full">
                        <Field
                          as="select"
                          id="gender"
                          placeholder="Gender"
                          name="gender"
                          className="text-gray-500 mt-5 text-xs p-3 w-full border border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300"
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </Field>
                        <ErrorMessage name="gender" component={TextError} />
                      </div>
                    </div>

                    <div>
                      <Field
                        type="text"
                        as="textarea"
                        rows="5"
                        id="about"
                        placeholder="About"
                        name="about"
                        className="text-gray-500 mt-5 text-xs p-3 w-full border border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300"
                      />
                      <ErrorMessage name="about" component={TextError} />
                    </div>
                    <div className="flex justify-end items-center mt-4 gap-2">
                      <button
                        className="bg-green-600 text-white text-xs p-3 rounded-md focus:ring-2 focus:ring-offset-2 focus:ring-green-700"
                        type="submit"
                      >
                        Save Changes
                      </button>
                      <button
                        className="bg-red-600 text-white text-xs p-3 rounded-md focus:ring-2 focus:ring-offset-2 focus:ring-red-700"
                        type="button"
                        onClick={() => onCancelEdit(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </Modal.Footer>
        )}

        {user.userType == "company" && (
          <Modal.Footer className="flex items-start">
            <Formik
              initialValues={basicFormCompanyInitialValues}
              validationSchema={basicFormCompanyValidationSchema}
              onSubmit={BasicFormCompanyHandleSubmit}
            >
              {(formik) => (
                <Form className="flex w-full">
                  <div className="w-1/3 flex items-center flex-col ">
                    <div className="flex flex-col text-gray-500 mt-4 gap-4">
                      <Field name="image">
                        {({ field }: any) => (
                          <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={(e) => {
                              const files = e.target.files;
                              if (files && files.length > 0) {
                                formik.setFieldValue("image", files[0]);
                                setImagePreview(URL.createObjectURL(files[0]));
                              }
                            }}
                          />
                        )}
                      </Field>
                      <div className="flex items-center justify-center ">
                        {imagePreview ? (
                          <div className="w-28 h-28 flex flex-col gap-10 items-center border rounded-full">
                            <img className="w-28 h-28 rounded-full" src={imagePreview} alt="" />
                          </div>
                        ) : (
                          <div className="w-28 h-28 flex flex-col gap-10 items-center border rounded-full">
                            <img className="w-28 h-28 rounded-full" src={user.profileImageUrl} alt="" />
                          </div>
                        )}
                      </div>
                      <div>
                        <button
                          className="text-xs border px-5 py-2 rounded-md"
                          type="button"
                          onClick={() => {
                            fileInputRef.current?.click();
                          }}
                        >
                          Choose Image
                        </button>
                        <ErrorMessage name="image" component="p" className="text-red-600 text-xs" />
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="flex gap-2">
                      <div className="w-full">
                        <Field
                          type="text"
                          id="fullname"
                          placeholder="Company Name"
                          name="fullname"
                          className="mt-5 text-xs p-3 w-full border border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300"
                        />
                        <ErrorMessage name="fullname" component={TextError} />
                      </div>
                      <div className="w-1/3">
                        <Field
                          type="text"
                          id="location"
                          placeholder="Location"
                          name="location"
                          className="mt-5 text-xs p-3 w-full border border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300"
                        />
                        <ErrorMessage name="location" component={TextError} />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <div className="w-full">
                        <Field
                          type="text"
                          id="companyType"
                          placeholder="Company Type"
                          name="companyType"
                          className="mt-5 text-xs p-3 w-full border border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300"
                        />
                        <ErrorMessage name="companyType" component={TextError} />
                      </div>

                      <div className="w-full">
                        <Field
                          type="date"
                          id="establishedOn"
                          placeholder="Established On"
                          name="establishedOn"
                          className="text-gray-500 mt-5 text-xs p-3 w-full border border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300"
                        />
                        <ErrorMessage name="establishedOn" component={TextError} />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-full">
                        <Field
                          type="text"
                          id="phone"
                          placeholder="Phone"
                          name="phone"
                          className="mt-5 text-xs p-3 w-full border border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300"
                        />
                        <ErrorMessage name="phone" component={TextError} />
                      </div>
                      <div className="w-full">
                        <Field
                          as="select"
                          id="noOfEmployees"
                          placeholder="No of Employees"
                          name="noOfEmployees"
                          className="text-gray-500 mt-5 text-xs p-3 w-full border border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300"
                        >
                          <option value="">No of Employees</option>
                          <option value="1-50">1-50</option>
                          <option value="51-200">51-200</option>
                          <option value="201-500">201-500</option>
                          <option value="500+">500+</option>
                        </Field>
                        <ErrorMessage name="noOfEmployees" component={TextError} />
                      </div>
                    </div>

                    <div>
                      <Field
                        type="text"
                        as="textarea"
                        rows="5"
                        id="about"
                        placeholder="About"
                        name="about"
                        className="text-gray-500 mt-5 text-xs p-3 w-full border border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300"
                      />
                      <ErrorMessage name="about" component={TextError} />
                    </div>
                    <div className="flex justify-end items-center mt-4 gap-2">
                      <button
                        className="bg-green-600 text-white text-xs p-3 rounded-md focus:ring-2 focus:ring-offset-2 focus:ring-green-700"
                        type="submit"
                      >
                        Save Changes
                      </button>
                      <button
                        className="bg-red-600 text-white text-xs p-3 rounded-md focus:ring-2 focus:ring-offset-2 focus:ring-red-700"
                        type="button"
                        onClick={() => onCancelEdit(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </Modal.Footer>
        )}
      </Modal>
    </div>
  );
}

export default EditBio;
