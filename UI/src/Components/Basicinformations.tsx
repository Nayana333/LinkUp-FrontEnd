import { useRef, useState } from "react";
import { Modal } from "flowbite-react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../utils/context/reducers/authSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import { basicFormInitialValues, basicFormValidationSchema, basicFormCompanyInitialValues, basicFormCompanyValidationSchema } from "../utils/validation/basicInformInitialValues";
import axios from "axios";
import { setBasicInformation } from "../services/api/user/apiMethods";

function BasicInformation() {
  const selectUser = (state: any) => state.auth.user || "";
  const user = useSelector(selectUser) || "";
  const userId = user._id || "";
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(user.profileImageUrl || null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const BasicFormHandleSubmit = async (values: any) => {
    setLoading(true);
    const { image, fullname, designation, location, dateOfBirth, phone, gender, about } = values;

    try {
      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "ctmfcyuf");

        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dngp3n0ql/image/upload",
          formData
        );

        if (uploadRes.status === 200) {
          const imageUrl = uploadRes.data.secure_url;

          await setBasicInformation({ userId, imageUrl, fullname, designation, location, dateOfBirth, phone, gender, about })
            .then((response: any) => {
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
        } else {
          throw new Error("Failed to upload image.");
        }
      } else {
        await setBasicInformation({ userId, fullname, designation, location, dateOfBirth, phone, gender, about })
          .then((response: any) => {
            const data = response.data;
            if (response.status === 200) {
              toast.success(data.message);
              dispatch(updateUser({ user: data }));
            } else {
              console.log(response.message);
              toast.error(data.message);
            }
          })
          .catch((error: any) => {
            toast.error(error?.message);
            console.log(error?.message);
          });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update basic information.");
    } finally {
      setLoading(false);
    }
  };

  const BasicFormCompanyHandleSubmit = async (values: any) => {
    setLoading(true);
    const { image, fullname, companyType, location, noOfEmployees, phone, establishedOn, about } = values;

    try {
      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "ctmfcyuf");

        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dngp3n0ql/image/upload",
          formData
        );

        if (uploadRes.status === 200) {
          const imageUrl = uploadRes.data.secure_url;

          await setBasicInformation({ userId, imageUrl, fullname, companyType, location, noOfEmployees, phone, establishedOn, about })
            .then((response: any) => {
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
        } else {
          throw new Error("Failed to upload image.");
        }
      } else {
        await setBasicInformation({ userId, fullname, companyType, location, noOfEmployees, phone, establishedOn, about })
          .then((response: any) => {
            const data = response.data;
            if (response.status === 200) {
              toast.success(data.message);
              dispatch(updateUser({ user: data }));
            } else {
              console.log(response.message);
              toast.error(data.message);
            }
          })
          .catch((error: any) => {
            toast.error(error?.message);
            console.log(error?.message);
          });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update basic information.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Modal show={true}>
        <Modal.Body>
          <p className="text-sm font-semibold">Company Information</p>
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
                      <div className="flex items-center justify-center">
                        {imagePreview && (
                          <div className="w-28 h-28 flex flex-col gap-10 items-center border rounded-full">
                            <img
                              className="w-28 h-28 rounded-full"
                              src={imagePreview}
                              alt="Profile Preview"
                            />
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
                        <ErrorMessage
                          name="image"
                          component="p"
                          className="text-red-600 text-xs"
                        />
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
                          className="mt-5 text-xs p-3 w-full border border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300"
                        />
                        <ErrorMessage
                          name="dateOfBirth"
                          component={TextError}
                        />
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
                      <div className="w-full mt-5">
                        <label className="text-xs mb-2 text-gray-500 flex flex-col ">
                          <Field
                            type="radio"
                            id="genderMale"
                            name="gender"
                            value="Male"
                            className="mt-5"
                          />
                          Male
                        </label>
                        <label className="text-xs mb-2 text-gray-500 flex flex-col ">
                          <Field
                            type="radio"
                            id="genderFemale"
                            name="gender"
                            value="Female"
                          />
                          Female
                        </label>
                        <ErrorMessage name="gender" component={TextError} />
                      </div>
                    </div>

                    <div className="w-full">
                      <Field
                        type="text"
                        id="about"
                        placeholder="About"
                        name="about"
                        className="mt-5 text-xs p-3 w-full border border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300"
                      />
                      <ErrorMessage name="about" component={TextError} />
                    </div>

                    <div className="mt-5">
                      <button
                        type="submit"
                        className="text-xs px-5 py-2 rounded-md text-white bg-green-600 w-full"
                        disabled={loading}
                      >
                        {loading ? "Submitting..." : "Save Changes"}
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
                      <div className="flex items-center justify-center">
                        {imagePreview && (
                          <div className="w-28 h-28 flex flex-col gap-10 items-center border rounded-full">
                            <img
                              className="w-28 h-28 rounded-full"
                              src={imagePreview}
                              alt="Profile Preview"
                            />
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
                        <ErrorMessage
                          name="image"
                          component="p"
                          className="text-red-600 text-xs"
                        />
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
                          className="mt-5 text-xs p-3 w-full border border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300"
                        />
                        <ErrorMessage
                          name="establishedOn"
                          component={TextError}
                        />
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
                          type="text"
                          id="noOfEmployees"
                          placeholder="No of Employees"
                          name="noOfEmployees"
                          className="mt-5 text-xs p-3 w-full border border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300"
                        />
                        <ErrorMessage
                          name="noOfEmployees"
                          component={TextError}
                        />
                      </div>
                    </div>

                    <div className="w-full">
                      <Field
                        type="text"
                        id="about"
                        placeholder="About"
                        name="about"
                        className="mt-5 text-xs p-3 w-full border border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300"
                      />
                      <ErrorMessage name="about" component={TextError} />
                    </div>

                    <div className="mt-5">
                      <button
                        type="submit"
                        className="text-xs px-5 py-2 rounded-md text-white bg-green-600 w-full"
                        disabled={loading}
                      >
                        {loading ? "Submitting..." : "Save Changes"}
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

export default BasicInformation;
