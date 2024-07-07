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
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);

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
                  <div className="w-1/3 flex items-center flex-col">
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
                                setSelectedImageUrl(URL.createObjectURL(files[0]));
                              }
                            }}
                          />
                        )}
                      </Field>
                      <div className="flex items-center justify-center">
                        {selectedImageUrl ? (
                          <img className="w-28 h-28 rounded-full" src={selectedImageUrl} alt="Selected" />
                        ) : (
                          <img className="w-28 h-28 rounded-full" src={user.profileImageUrl} alt="Profile" />
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
                      <div className="w-1/3">
                        <Field
                          as="select"
                          id="gender"
                          placeholder="Gender"
                          name="gender"
                          className="mt-5 text-xs p-3 w-full border border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300"
                        >
                          <option value="">Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </Field>
                        <ErrorMessage name="gender" component={TextError} />
                      </div>
                    </div>

                    <div>
                      <Field
                        as="textarea"
                        id="about"
                        placeholder="About"
                        name="about"
                        className="h-24 resize-none mt-5 text-xs p-3 w-full border border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300"
                      />
                      <ErrorMessage name="about" component={TextError} />
                    </div>

                    <button
                      type="submit"
                      className={`text-xs border mt-5 ${
                        formik.isValid ? "border-green-600 text-white bg-green-600" : "border-gray-300 text-gray-500 bg-gray-100"
                      } px-5 py-2 rounded-md`}
                      disabled={!formik.isValid || loading}
                    >
                      {loading ? "Saving..." : "Save Changes"}
                    </button>
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
                  <div className="w-1/3 flex items-center flex-col">
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
                                setSelectedImageUrl(URL.createObjectURL(files[0]));
                              }
                            }}
                          />
                        )}
                      </Field>
                      <div className="flex items-center justify-center">
                        {selectedImageUrl ? (
                          <img className="w-28 h-28 rounded-full" src={selectedImageUrl} alt="Selected" />
                        ) : (
                          <img className="w-28 h-28 rounded-full" src={user.profileImageUrl} alt="Profile" />
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
                      <div className="w-1/3">
                        <Field
                          as="select"
                          id="noOfEmployees"
                          placeholder="No of Employees"
                          name="noOfEmployees"
                          className="mt-5 text-xs p-3 w-full border border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300"
                        >
                          <option value="">No of Employees</option>
                          <option value="1-10">1-10</option>
                          <option value="11-50">11-50</option>
                          <option value="51-200">51-200</option>
                          <option value="201-500">201-500</option>
                          <option value="501-1000">501-1000</option>
                          <option value="1001-5000">1001-5000</option>
                          <option value="5001-10000">5001-10000</option>
                          <option value="10000+">10000+</option>
                        </Field>
                        <ErrorMessage name="noOfEmployees" component={TextError} />
                      </div>
                    </div>

                    <div>
                      <Field
                        as="textarea"
                        id="about"
                        placeholder="About"
                        name="about"
                        className="h-24 resize-none mt-5 text-xs p-3 w-full border border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300"
                      />
                      <ErrorMessage name="about" component={TextError} />
                    </div>

                    <button
                      type="submit"
                      className={`text-xs border mt-5 ${
                        formik.isValid ? "border-green-600 text-white bg-green-600" : "border-gray-300 text-gray-500 bg-gray-100"
                      } px-5 py-2 rounded-md`}
                      disabled={!formik.isValid || loading}
                    >
                      {loading ? "Saving..." : "Save Changes"}
                    </button>
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
