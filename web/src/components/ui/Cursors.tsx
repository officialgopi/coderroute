import { useEffect, useMemo, useState } from "react";
import { useAuthStore } from "@/store/auth.store";

export function Cursors({ yProvider }: { yProvider: any }) {
  const { user: authUser } = useAuthStore();
  const [awarenessUsers, setAwarenessUsers] = useState<any>([]);

  useEffect(() => {
    if (!yProvider || !authUser) return;

    const localUser = {
      name: authUser.name || "OfficialGopi",
      color: "#" + Math.floor(Math.random() * 16777215).toString(16),
      picture:
        authUser.avatar ||
        "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
    };

    yProvider.awareness.setLocalStateField("user", localUser);

    function setUsers() {
      const users = [...yProvider.awareness.getStates()];
      setAwarenessUsers(users);
    }

    yProvider.awareness.on("change", setUsers);
    setUsers();

    return () => {
      yProvider.awareness.off("change", setUsers);
    };
  }, [yProvider, authUser]);

  const styleSheet = useMemo(() => {
    let cursorStyles = "";

    for (const [clientId, client] of awarenessUsers) {
      if (client?.user) {
        cursorStyles += `
          .yRemoteSelection-${clientId}, 
          .yRemoteSelectionHead-${clientId} {
            --user-color: ${client.user.color || "orangered"};
          }

          .yRemoteSelectionHead-${clientId}::after {
            content: "${client.user.name || "OfficialGopi"}";
            position: absolute;
            top: -1.4em;
            left: 0;
            background-color: var(--user-color);
            color: white;
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 12px;
            font-weight: 500;
            white-space: nowrap;
            pointer-events: none;
            z-index: 1000;
          }

          .yRemoteSelection-${clientId} {
            background-color: var(--user-color);
            opacity: 0.3;
          }

          .yRemoteSelectionHead-${clientId} {
            border-left: 2px solid var(--user-color);
            position: relative;
          }
        `;
      }
    }

    return { __html: cursorStyles };
  }, [awarenessUsers]);

  return <style dangerouslySetInnerHTML={styleSheet} />;
}
