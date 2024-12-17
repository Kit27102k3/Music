import {
  faGear,
  faShirt,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import Setting from "../Setting/Setting";
import InfoFrofile from "../../pages/ProfileUser/InfoProfile";
import { HoverCard, Popover } from "@radix-ui/themes";
import Notifications from "../../pages/Notifications/Notifications"; // Đảm bảo đúng đường dẫn import
import Search from "./Search";
import { useParams } from "react-router-dom";

export default function Header({ onChangeBackground }) { // Nhận prop này từ DefaultLayout
  const [account, setAccount] = useState(null);
  const { singer } = useParams();

  useEffect(() => {
    const storedAccount = localStorage.getItem("account");
    if (storedAccount) {
      setAccount(JSON.parse(storedAccount));
    }
  }, []);

  return (
    <div className={`w-full p-4 md:p-6 ${singer ? "bg-purple-900 bg-opacity-50" : ""}`}>
      <div className="flex items-center gap-4">
        <div className="flex-grow-[10]">
          <Search />
        </div>

        <div className="flex flex-grow items-center justify-between">
          
          {/* Notifications */}
          <Popover.Root>
            <Popover.Trigger>
              <button className="relative group">
                <HoverCard.Root>
                  <HoverCard.Trigger>
                    <FontAwesomeIcon
                      className="p-2 border w-4 rounded-full cursor-pointer"
                      icon={faShirt}
                    />
                  </HoverCard.Trigger>
                  <HoverCard.Content>
                    <span className="bg-black py-2 px-3 text-xs -ml-3 rounded-lg">
                      <FontAwesomeIcon
                        className="absolute -mt-2 -ml-1 text-black w-12 h-5"
                        icon={faSortUp}
                      />
                      Chủ đề
                    </span>
                  </HoverCard.Content>
                </HoverCard.Root>
              </button>
            </Popover.Trigger>
            <Popover.Content className="mr-80">
              <Notifications onChangeBackground={onChangeBackground} /> {/* Truyền prop */}
            </Popover.Content>
          </Popover.Root>

          {/* SETTING */}
          <Popover.Root>
            <Popover.Trigger>
              <button className="relative group">
                <HoverCard.Root>
                  <HoverCard.Trigger>
                    <FontAwesomeIcon
                      className="p-2 border rounded-full cursor-pointer"
                      icon={faGear}
                    />
                  </HoverCard.Trigger>
                  <HoverCard.Content>
                    <span className="bg-black py-2 px-3 text-xs -ml-3 rounded-lg">
                      <FontAwesomeIcon
                        className="absolute -mt-2 -ml-1 text-black w-11 h-5"
                        icon={faSortUp}
                      />
                      Cài đặt
                    </span>
                  </HoverCard.Content>
                </HoverCard.Root>
              </button>
            </Popover.Trigger>
            <Popover.Content className="mr-80">
              <Setting />
            </Popover.Content>
          </Popover.Root>

          {/* AVATAR */}
          <Popover.Root>
            <Popover.Trigger>
              <img
                className="w-8 h-8 rounded-full border cursor-pointer"
                src={account ? account.picture : "https://via.placeholder.com/150"}
                alt="profile"
              />
            </Popover.Trigger>
            <Popover.Content className="mr-72">
              <InfoFrofile />
            </Popover.Content>
          </Popover.Root>
        </div>
      </div>
    </div>
  );
}