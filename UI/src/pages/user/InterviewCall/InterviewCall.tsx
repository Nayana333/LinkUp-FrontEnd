import { useEffect,useRef } from "react";
import { useLocation,useNavigate,useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSelector, UseSelector } from "react-redux";
import './InterviewCall.css'

function InterviewCall(){
    const {roomId}=useParams()
    const containerRef=useRef(null)
    const selectUser=(state:any)=>state.auth.user
    const user=useSelector(selectUser)
    const navigate=useNavigate()
    const location = useLocation();
    const userId = user._id;
    const userName = user.userName;

    const handleLeaveRoom=()=>{
        navigate(location.state?.from ||'/')

    }

    useEffect(()=>{
        
        // if(containerRef.current)return 
        const myMeeting=async()=>{
            const appId=1821525784
            const serverSecret="fd6d757ae0ec914a7eee1bdc2ec12f81"
            const kitToken=ZegoUIKitPrebuilt.generateKitTokenForTest(
                appId,
                serverSecret,
                roomId as string,
                Date.now().toString(),
                userName
            );

        const zc=ZegoUIKitPrebuilt.create(kitToken)
        zc.joinRoom({
            container:containerRef.current,
            scenario:{
                mode:ZegoUIKitPrebuilt.GroupCall,
            },
            showPreJoinView:true,
            preJoinViewConfig: {
                title: "Interview Meeting" 
              },
              branding: {
                logoURL: "https://i.postimg.cc/YC7Hwhxb/Screenshot-2024-03-04-151411.png"
              },
              showScreenSharingButton: true,
              showRoomTimer:true,
              turnOnCameraWhenJoining: true,
              turnOnMicrophoneWhenJoining: false,
              showLeaveRoomConfirmDialog: false,
              onLeaveRoom: handleLeaveRoom,
        })
        }
        myMeeting();

    },[roomId,userId,userName,navigate]);
    return (
        <div>
          <div ref={containerRef} style={{height:'100vh',width:'100vw'}}/>
        </div>
      );
}
export default InterviewCall