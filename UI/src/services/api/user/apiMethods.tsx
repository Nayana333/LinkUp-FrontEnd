import { userUrls,postUrls,jobUrls } from "../endPoints";
import apiCalls from "./apiCalls";
import { FormValues } from "../../../utils/validation/signUpValidation";
import { useRouteLoaderData } from "react-router-dom";
import { connectUrl } from "../endPoints";
import { reject } from "lodash";
import { chatUrls } from "../endPoints";

export const postRegister = (userData: FormValues) => { 
  console.log(userData);
  
  return new Promise((resolve, reject) => {
    try {
      apiCalls("post", userUrls.register, userData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      reject({ status: 500, message: "Error" });
    }
  });
};


export const postOtp = (otp: { otp: string }) => {
  return new Promise((resolve, reject) => {
    try {
      apiCalls("post", userUrls.verifyOTP, otp)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Something went wrong" });
    }
  });
};

export const postResendOtp=(email:{email:string})=>{
  return new Promise((resolve,reject)=>{
    try{
      apiCalls("post",userUrls.resendOTP,email).then((response)=>{
        resolve(response)
      }).catch((err)=>{
        reject(err)
      })
    }catch(error){
      resolve({status:500,message:"something went wrong"})
    }
  })
}

export const postLogin = (userData:{email:string,password:string}) => {
  console.log(userData);
  
  return new Promise((resolve, reject) => {
      try {
          apiCalls('post', userUrls.login, userData).then((response)=>{
              resolve(response);
          }).catch((err)=>{
              reject(err);
          })
      } catch (error) {
          resolve({ status: 500, message:"Somethings wrong." });
      }
  })

}


export const postForgot=(email:{email:string})=>{
  console.log(email);
  
  return new Promise((resolve)=>{
    try{
      apiCalls('post',userUrls.forgotPsw,email).then((response)=>{

        resolve(response)
      })
    }catch(error){
      resolve({status:500,message:"something went wrong"})
    }
  })
}


export const postForgotOtp = (otp: { otp: string }) => {
  console.log(otp);
  
  return new Promise((resolve, reject) => {
    try {
      apiCalls("post", userUrls.forgotOtp, otp)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Something went wrong" });
    }
  });
};


export const newPassword = (userData: { password: string; confirmPassword: string }) => {
  return new Promise((resolve, reject) => {
    try {
      apiCalls('put', userUrls.newPassword, userData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "something went wrong" });
    }
  });
};

export const  googleAuthenticate = (userData:{userName:string,email:string}) => {
  return new Promise((resolve, reject) => {
      try {
          apiCalls('post', userUrls.googleAuth, userData).then((response)=>{
              resolve(response);
          }).catch((err)=>{
              reject(err);
          })
      } catch (error) {
          resolve({ status: 500, message:"Somethings wrong." });
      }
  })

}

export const postPreferences = (userData:{userType:any,isHiring:any,userId:string}) => {
  return new Promise((resolve, reject) => { 
    try {
      apiCalls('post', userUrls.setPreferences, userData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: 'Something went wrong' }); 
    }
  });
};

export const setBasicInformation=(userData:any)=>{
  console.log(userData);
  
  return new Promise((resolve,reject)=>{
    console.log(userData);

    try{
      apiCalls('post',userUrls.basicInformation,userData)
      
      .then((response)=>{
        resolve(response)
      })
      .catch((err)=>{
        reject(err)
      })
    }catch(error){
      resolve({status:500,message:"something went wrong"})
    }
  })
}


export const setUserRole=(userData:{userId:string,isHiring:boolean})=>{
   return new Promise((resolve, reject) => {
    try{
      apiCalls('put',userUrls.setUserRole,userData)
      .then((response)=>{
        resolve(response)
      }).catch((err)=>{
        reject(err)
      })
    }catch(error){
      resolve({status:500,message:'something wrong'})
    }
  })
  
}


export const addPost = (postData: {userId:any, imageUrl: string; title: string; description:string,hideLikes:boolean,hideComments:boolean }) => {
  return new Promise((resolve, reject) => {
    try {
      apiCalls("post", postUrls.addPost, postData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

export  const    getAllPosts = (requestData:{userId:string,page:number}) => {
  console.log("request data",requestData);
  
  return new Promise((resolve, reject) => {
    try {

      console.log(requestData)
      apiCalls("post", postUrls.getAllPosts, requestData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};



export const likePost = (postData: { postId: string, userId: string }) => {
  
  return new Promise((resolve, reject) => {
    try {
      apiCalls('post', postUrls.likePost, postData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      reject({ status: 500, message: 'something went wrong' });
    }
  });
};


export const deletePost=(postData:{postId:string,userId:string})=>{
  console.log("pst data axios",postData);
    
  return new Promise((resolve,reject)=>{
    try{
      apiCalls('post',postUrls.deletePost,postData)
      .then((response)=>{
        resolve(response)
      })
      .catch((err)=>{
        reject(err)
      })
    }catch(error){
      reject({status:500,message:'something went wrong'})
    }
  })
}


export const editPost = (postData: {
  userId: any,
  postId: any,
  title: string,
  description: string,
  hideComment: boolean,
  hideLikes: boolean,
}) => {
  return new Promise((resolve, reject) => {
    try {
      apiCalls('put', postUrls.editPost, postData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      reject({ status: 500, message: 'Something went wrong' });
    }
  });
};


export const    getPostComments = (postId:{postId:any}) => {
  console.log(postId);
  
  return new Promise((resolve, reject) => {
    try {
      apiCalls("post", postUrls.getAllPostComments, postId)
        .then((response) => {
          console.log(response);
          
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};


export const addComment=(commentData:{postId:any,userId:any,comment:string})=>{
  return new Promise((resolve,reject)=>{
    try{
      apiCalls('post',postUrls.addComment,commentData)
      .then((response)=>{
        resolve(response)
      }).catch((err)=>{
        reject(err)
      })
    }catch(error){
      reject({status:500,message:'something went wrong'})
    }
  })
}


export const replyComment=(commentData:{commentId:any,userId:any,replyComment:string})=>{
  return new Promise((resolve,reject)=>{
    try{
      apiCalls('post',postUrls.replyComment,commentData)
      .then((response)=>{
        resolve(response)
      }).catch((err)=>{
        reject(err)
      })
    }catch(error){
      reject({status:500,message:'something went wronh'})
    }
  })
}

export const deleteComment = ( commentId:{commentId:any}) => {

  return new Promise((resolve, reject) => {
   
    
    try {
      const url = `${postUrls.deleteComment}?commentId=${commentId}`;
      apiCalls("get", url,commentId)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};


export const addJob= (data:any) => {
  return new Promise((resolve, reject) => {
    try {
      apiCalls("post", jobUrls.addJob, data)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};


export const    getUserPost = (userId:{userId:any}) => {
  return new Promise((resolve, reject) => {
    try {
      apiCalls("post", postUrls.getUserPost, userId)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
}

export const reportPost=(reportData:{userId:any,postId:any,cause:string})=>{
  return new Promise((resolve,reject)=>{
    try{
      apiCalls('post',postUrls.reportPost,reportData)
      .then((response)=>{
        resolve(response)
      })
      .catch((err)=>{
       reject(err)
      })
    }catch(error){
      resolve({status:500,message:'something went wrong'})
    }
  })

  }


  export const listUserJob= (userId:{userId:string|undefined,page:number}) => {
  
    return new Promise((resolve, reject) => {
      try {
        const queryParams = `?page=${userId.page}`
        apiCalls("post", jobUrls.listUserJob+queryParams, userId)
          .then((response) => {
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        resolve({ status: 500, message: "Somethings wrong." });
      }
    });
  };



  export const userJobBlock = (jobId:{jobId:string}) => {
    return new Promise((resolve, reject) => {
        try {
          apiCalls("post",jobUrls.userJobBlock, jobId).then((response) => {
                resolve(response);
              }
            ).catch((err) => {
                reject(err);
            })
        } catch (error) {
            reject(error);
        }
    })
  };



  export const listJob= (filterData:any) => {
  
    return new Promise((resolve, reject) => {
      try {
        apiCalls("post", jobUrls.listJob, filterData)
          .then((response) => {
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        resolve({ status: 500, message: "Somethings wrong." });
      }
    });
  };
  export const savePost = (postData: { postId: string|null,jobId:string|null, userId: string }) => {
    
    return new Promise((resolve, reject) => {
      console.log(postData);
      

      try {
        apiCalls("post", postUrls.savePost, postData)
          .then((response) => {
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        resolve({ status: 500, message: "Somethings wrong." });
      }
    });
  };


 

  export const editJob= (data:any) => {
    return new Promise((resolve, reject) => {
      try {
        apiCalls("put", jobUrls.editJob, data)
          .then((response) => {
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        resolve({ status: 500, message: "Somethings wrong." });
      }
    });
  };

  export const getJobDetails = ( jobId:{jobId: string|undefined}) => {
    return new Promise((resolve, reject) => {
      try {
        apiCalls("post", jobUrls.getJobDetails,jobId)
          .then((response) => {
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        resolve({ status: 500, message: "Somethings wrong." });
      }
    });
  };

  export const  viewJob=(data:any)=>{
    return new Promise((resolve,reject)=>{
      try{
        apiCalls('post',jobUrls.viewJob,data)
        .then((response)=>{
          resolve(response)

        }).catch((err)=>{
          reject(err)
        })
      }catch(error){
        resolve({status:500,message:'something went wrong'})
      }
    })
  }


  export const getSavedPost = (userId: string|undefined) => {
    return new Promise((resolve, reject) => {
      try {
        const url:string = `${postUrls.getSavedPost}/${userId}`
        apiCalls("get", url, null)
          .then((response) => {
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        resolve({ status: 500, message: "Somethings wrong." });
      }
    });
  };

  export const getUserConnection=(userId:{userId:string|undefined})=>{
    return new Promise((resolve,reject)=>{

      try{
        apiCalls('post',connectUrl.getUserConnection,userId)
        .then((response)=>{
          resolve(response)
        }).catch((err)=>{
          reject(err)
        })

      }catch(error){
        resolve({status:200,message:'something went wrong'})
      }

    })
  }


export const  getUserSuggestions=(userId:{userId:string})=>{
  return new Promise((resolve,reject)=>{
    try{
      apiCalls('post',userUrls.userSuggestions,userId)
      .then((response)=>{
        resolve(response)
      }).catch((err)=>{
        reject(err)
      })
    }catch(error){
      resolve({status:500,message:'somethig went wrong'})
    }
  })
}


export const unfollowUser=(data:{userId:string|undefined , unfollowingUser:string|undefined})=>{
  return new Promise((resolve,reject)=>{
    try{
    apiCalls("post",connectUrl.unfollow,data)
    .then((response)=>{
      resolve(response)
    }).catch((error)=>{
      reject(error)
    })
  }catch(error){
   reject({status:500,message:'something went wrong'})
    
  }
  })
}


export const acceptFollowRequest=(data:{userId:string,requestedUser:string})=>{
  return new Promise((resolve,reject)=>{
    try{
      apiCalls('post',connectUrl.acceptRequest,data)
      .then((response)=>{
        resolve(response)
      }).catch((err)=>{
        reject({status:500,message:'something wrong'})
      })
    }catch(error){
      reject({status:500,message:'something went wrong'})
    }
  })
}


export const cancelFollowRequest = (data: { userId: string |undefined,cancellingUser:string}) => {
  return new Promise((resolve, reject) => {
    try {
      apiCalls("post", connectUrl.cancelRequest, data)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

export const followUser = (data: { userId: string|undefined ,followingUser:string|undefined}) => {
  return new Promise((resolve, reject) => {
    try {
      apiCalls("post", connectUrl.follow, data)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};


export const rejectFollowRequest = (data: { userId: string ,requestedUser:string}) => {
  return new Promise((resolve, reject) => {
    try {
      apiCalls("post", connectUrl.rejectRequest, data)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};




export const getUserDetails = (  userId: string|undefined) => {
  return new Promise((resolve, reject) => {
    try {
      apiCalls("get", userUrls.userDeatils + `/${userId}`, null)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

export const getFormSelectFormData= () => {
    
  return new Promise((resolve, reject) => {
    try {
      apiCalls("get", jobUrls.getFormSelectData,null)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};



export const cancelJobApplication=(application:{applicationId:string,applicantId:string})=>{
  return new Promise((resolve,reject)=>{
    try{
      apiCalls('patch',jobUrls.cancelJobApplication,application)
      .then((response)=>{
        resolve(response)
      }).catch((err)=>{
        reject(err)
      })
    }catch(error){
      resolve({status:500,message:'something went wrong'})
    }
  })
}

export const getEmployeeApplications=(applicantId:{applicantId:string})=>{
  return new Promise((resolve,reject)=>{
    try{
      apiCalls('post',jobUrls.getEmployeeApplications,applicantId)
      .then((response)=>{
        resolve(response)
      }).catch((err)=>{
        reject(err)
      })
    }catch(error){
      resolve({status:500,message:'something went wrong'})
    }
  })
}


export const getemployerApplications= (userId:{userId:string}) => {
  
  return new Promise((resolve, reject) => {
    try {
      apiCalls("post", jobUrls.employerApplications,userId)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};


export const updateApplicationStatus= (applcationData:{applicationId:string,status:string,userId:string}) => {
  
  return new Promise((resolve, reject) => {
    try {
      apiCalls("patch", jobUrls.updateApplicationStatus,applcationData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};


export const Search = (searchQuery: string) => {
  return new Promise((resolve, reject) => {
    try {
      const url: string = `${userUrls.search}?searchQuery=${searchQuery}`;
      console.log(`Searching with query: ${searchQuery}`);
      
      apiCalls('get', url, null)
        .then((response) => {  
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    } catch (error) {
      resolve({ status: 500, message: 'something went wrong' });
    }
  });
};



export const addConversation = (conversationData: {
  senderId: string;
  receiverId: string;
}) => {
  return new Promise((resolve, reject) => {
    try {
      apiCalls("post", chatUrls.addConversation, conversationData)
        .then((response) => {
          console.log(response,'responde api');
          
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

export const getUserConversations = (userId:string) => {
  return new Promise((resolve, reject) => {
    try {
      const url = `${chatUrls.getUserConversation}/${userId}`;

      apiCalls("get", url, null)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

export const getUserMessages = (conversationId:string) => {
  return new Promise((resolve, reject) => {
    try {
      const url = `${chatUrls.getMessages}/${conversationId}`;

      apiCalls("get", url, null)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};


export const addMessage = (messageData: {conversationId:string,sender:string,text:string}) => {
  return new Promise((resolve, reject) => {
    try {
      apiCalls("post", chatUrls.addMessage, messageData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};


export const setMessageRead = (messageData:{conversationId: string,userId:string}) => {
  return new Promise((resolve, reject) => {
    try {
      apiCalls("patch", chatUrls.setMessageRead, messageData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

export const getUnreadMessages = (messageData:{conversationId: string,userId:string}) => {
  return new Promise((resolve, reject) => {
    try {
      apiCalls("post", chatUrls.getUnreadMessages, messageData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};


export const getNotifications= (userId: { userId: string }) => {
  return new Promise((resolve, reject) => {
    try {
      
      
      apiCalls("post", userUrls.getNotifications, userId)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};


export const getIntervieweeInterviews= (intervieweeId:{intervieweeId:string}) => {
  
  return new Promise((resolve, reject) => {
    try {
      apiCalls("post", jobUrls.getIntervieweeInterviews, intervieweeId)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};


export const getInterviewerInterviews= (interviewerId:{interviewerId:string}) => {
  
  return new Promise((resolve, reject) => {
    try {
      apiCalls("post", jobUrls.getInterviewerInterviews, interviewerId)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

export const setInterviewStatus = (interviewData:{interviewId:string,status:string}) => {
  return new Promise((resolve, reject) => {
      try {
          apiCalls('patch', jobUrls.setInterviewStatus, interviewData).then((response)=>{
              resolve(response);
          }).catch((err)=>{
              reject(err);
          })
      } catch (error) {
          resolve({ status: 500, message:"Somethings wrong." });
      }
  })

}



export const  addInterview= (
  interviewData:
   { 
    applicationId: string,
    jury:any[] ,
    interviewDate: string ,
    interviewTime: string 
    }) => {
  return new Promise((resolve, reject) => {
    try {
      
      
      apiCalls("post", jobUrls.addInterview, interviewData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};




export const editInterview=( interviewData:{interviewId:string, interviewDate:string, interviewTime:string, jury:any[] })=>{
  return new Promise((resolve,reject)=>{
    try {
      
      
      apiCalls("post", jobUrls.editInterview, interviewData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    }catch(error){
      console.log(error);
      
    }

  })

}