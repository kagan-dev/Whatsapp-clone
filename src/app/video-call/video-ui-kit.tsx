import { randomID } from "@/lib/utils";
import { useClerk } from "@clerk/nextjs";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useEffect, useRef } from "react";

export function getUrlParams(url = window.location.href) {
  let urlStr = url.split("?")[1];
  return new URLSearchParams(urlStr);
}

export default function VideoUIKit() {
  const roomID = getUrlParams().get("roomID") || randomID(5);
  const { user } = useClerk();
  const meetingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user && meetingRef.current) {
      const initMeeting = async () => {
        const res = await fetch(`/api/zegocloud?userID=${user.id}`);
        const { token, appID } = await res.json();

        const username =
          user.fullName || user.emailAddresses[0].emailAddress.split("@")[0];

        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(
          appID,
          token,
          roomID,
          user.id,
          username
        );

        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zp.joinRoom({
          container: meetingRef.current,
          sharedLinks: [
            {
              name: "Personal link",
              url:
                window.location.protocol +
                "//" +
                window.location.host +
                window.location.pathname +
                "?roomID=" +
                roomID,
            },
          ],
          scenario: {
            mode: ZegoUIKitPrebuilt.GroupCall,
          },
        });
      };
      initMeeting();
    }
  }, [user, roomID]);

  return (
    <div
      className="myCallContainer"
      ref={meetingRef}
      style={{ width: "100vw", height: "100vh" }}
    ></div>
  );
}
