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

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null); // State for image preview

  const BasicFormHandleSubmit = async (values: any) => {
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
    }
  };

  const BasicFormCompanyHandleSubmit = async (values: any) => {
    const { image, fullname, companyType, location, noOfEmployees, phone, establishedOn, about } = values;

    try {
      if (image) {
        console.log(image);

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
    }
  };

  return (
    <div>
      <Modal show={true}>
        <Modal.Body>
          <p className="text-sm font-semibold">Company Information</p>
        </Modal.Body>

        {user.userType === "individual" && (
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
                                setImagePreview(URL.createObjectURL(files[0])); // Update image preview
                              }
                            }}
                          />
                        )}
                      </Field>
                      <div className="flex items-center justify-center">
                        {imagePreview ? (
                          <img
                            className="w-28 h-28 rounded-full"
                            src={imagePreview}
                            alt="Profile"
                          />
                        ) : (
                          <img
                            className="w-28 h-28 rounded-full"
                            src={user.profileImageUrl}
                            alt="Profile"
                          />
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
                    <Field
                      as="textarea"
                      id="about"
                      name="about"
                      placeholder="About You"
                      className="mt-5 text-xs p-3 w-full border border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300"
                      rows={4}
                    />
                    <ErrorMessage name="about" component={TextError} />

                    <div className="flex gap-2 items-center justify-end mt-3">
                      <button
                        className="bg-green-600 text-white px-5 py-2 rounded-md"
                        type="submit"
                      >
                        Submit
                      </button>
                      <button
                        className="bg-black-500 text-white px-5 py-2 rounded-md"
                        type="reset"
                      >
                        Reset
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
