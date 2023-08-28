import { useRestaurantDataStore } from "@/data";
import { restaurantService } from "@/services";
import { swipe } from "@/utils";
import { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { useCartStore } from "@/data/menuCart";

const MenuDetail = () => {
  let { restaurantId, menuName } = useParams();
  const navigate = useNavigate();
  const resId = Number(restaurantId);
  const { fetchFullMenu, setFetchFullMenu } = useRestaurantDataStore();
  const [amount, setAmount] = useState<number>(1);
  const [request, setRequest] = useState<string>("");
  const { menus, setMenus } = useCartStore();

  const callAPI = async (id: number, menu: string) => {
    setFetchFullMenu({ data: undefined, loading: true });

    const response = await restaurantService.getFullMenu(id, menu);

    if (response.status === 200) {
      setFetchFullMenu({ data: response.data, loading: false });
    } else {
      console.log("data", response.data);
      setFetchFullMenu({ data: undefined, loading: false });
    }
  };

  function addToMenus() {
    const newMenu = { amount, request, menuData: fetchFullMenu.data };
    if (fetchFullMenu.data) setMenus([...menus, newMenu]);
  }

  function closeFullMenu() {
    swipe("down");
    setAmount(1);
    setTimeout(() => {
      navigate("/");
    }, 250);
  }

  function amountHandler(action: string) {
    if (amount > 0) {
      switch (action) {
        case "increase":
          setAmount(amount + 1);
          break;
        case "decrease":
          setAmount(amount - 1);
          break;
        default:
          setAmount(amount);
          break;
      }
    }
  }

  useEffect(() => {
    setTimeout(() => {
      swipe("up");
    }, 250);
    if (menuName) callAPI(resId, menuName);
  }, [menuName, restaurantId]);

  return (
    <section
      id="menuDetail"
      className="fixed z-10 w-full h-full top-0 flex flex-col justify-end transition-all duration-500 translate-y-[100dvh]"
    >
      {!fetchFullMenu.loading ? (
        <div className="w-full sm:w-[80%] md:w-[60%] mx-auto h-[80%] md:h-[95%] bg-white rounded-t-xl overflow-hidden">
          <h1 className="relative min-h-[10%] w-full py-2 px-2 bg-[#0ea048] text-white flex justify-start items-center">
            <p className="w-[90%] text-[1.4rem] text-center font-semibold">
              {fetchFullMenu.data?.name}
            </p>
            <button
              className="absolute right-2 text-[2rem]"
              onClick={() => closeFullMenu()}
            >
              <IoIosArrowDown />
            </button>
          </h1>
          <img
            src={fetchFullMenu.data?.largeImage}
            className="w-full h-[40%] object-cover"
          />
          <section className="h-[50%] px-4 py-2 bg-white text-black flex flex-col gap-0">
            <p className="h-[10%] text-[1.5rem] font-semibold">
              ราคา {fetchFullMenu.data?.fullPrice} บาท
            </p>
            <div className="h-[70%] py-2 flex flex-col overflow-y-scroll">
              {fetchFullMenu.data?.options?.map((opt, index) => {
                return (
                  <div key={index} className="flex flex-col">
                    <p className="text-[1.3rem]">{opt.label}</p>
                    <ul className="py-2 px-4 flex flex-col bg-white">
                      {opt.choices.map((i, index) => {
                        return (
                          <li key={index} className="flex gap-2">
                            <input
                              type="checkbox"
                              name={`option-${index}`}
                              id={`option-${index}`}
                            />
                            <label htmlFor={`option-${index}`}>{i.label}</label>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
              <div className="flex flex-col gap-2">
                <label htmlFor="request" className="text-[1.3rem]">
                  รายละเอียดเพิ่มเติม
                </label>
                <input
                  type="text"
                  name="request"
                  id="request"
                  placeholder="เช่น ไม่ใส่ผักชี"
                  onChange={(e) => setRequest(e.target.value)}
                  className="w-[95%] mx-auto h-[50px] border border-black rounded-xl px-2"
                />
              </div>
            </div>
            <div className="w-full h-[20%] py-2 flex justify-between gap-2">
              <div className="w-[30%] flex items-center justify-around font-semibold text-[1.2rem]">
                {amount === 1 ? (
                  <button
                    className="w-[30px] aspect-square bg-slate-100 text-slate-400 rounded-full"
                    disabled
                  >
                    -
                  </button>
                ) : (
                  <button
                    onClick={() => amountHandler("decrease")}
                    className="w-[30px] aspect-square bg-slate-200 hover:bg-slate-400 rounded-full"
                  >
                    -
                  </button>
                )}
                <span>{amount}</span>
                <button
                  onClick={() => amountHandler("increase")}
                  className="w-[30px] aspect-square bg-slate-200 hover:bg-slate-400 rounded-full"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => {
                  closeFullMenu(), addToMenus();
                }}
                className="w-[70%] flex justify-around items-center font-semibold text-white text-[1.2rem] bg-[#10C157] hover:bg-slate-800 rounded-xl"
              >
                <span>ใส่ในตะกร้า</span>
                <span>
                  ฿
                  {fetchFullMenu.data && fetchFullMenu.data?.fullPrice * amount}
                </span>
              </button>
            </div>
          </section>
        </div>
      ) : (
        <div className="w-full sm:w-[80%] md:w-[60%] mx-auto h-[80%] bg-slate-800 flex justify-center items-center rounded-t-xl">
          <RotatingLines
            strokeColor="#0EC963"
            strokeWidth="5"
            animationDuration="1.2"
            width="96"
            visible={true}
          />
        </div>
      )}
    </section>
  );
};

export default MenuDetail;
