import { useRestaurantDataStore } from "@/data";
import { useHiddenDataStore } from "@/data/background";
import { openCart, restaurantMenuType, restaurantType } from "@/utils";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { FaShoppingBasket } from "react-icons/fa";
import { FallingLines, RotatingLines } from "react-loader-spinner";
import { Link, Outlet } from "react-router-dom";
import { useHook } from "./home.hook";
import MenuCart from "@/components/menuCart";
import { useCartStore } from "@/data/menuCart";

const Homepage = () => {
  const { shortMenu, fetchRestaurantDetail, fetchShortMenu } =
    useRestaurantDataStore();
  const { fetchHiddenDetail, hiddenShort, fetchHiddenShort } =
    useHiddenDataStore();
  const { menus, clearMenus } = useCartStore();

  const { fieldSearchKeyword } = useHook();

  const [restaurant, setRestaurant] = useState<restaurantType>({
    data: undefined,
    loading: false,
  });
  const [restaurantMenu, setRestaurantMenu] = useState<restaurantMenuType>({
    data: undefined,
    loading: false,
  });
  const [menuMostSold, setMenuMostSold] = useState<restaurantMenuType>({
    data: undefined,
    loading: false,
  });
  const [selectedId, setSelectedId] = useState<number>(567051);

  let totAmount = 0;

  for (const menu of menus) {
    if (menu.menuData) {
      totAmount = totAmount + menu.amount;
    }
  }

  function changeRestaurant(id: number) {
    switch (id) {
      case 567051:
        setSelectedId(227018);
        setRestaurant(fetchRestaurantDetail);
        setRestaurantMenu(fetchShortMenu);
        break;
      case 227018:
        setSelectedId(567051);
        setRestaurant(fetchRestaurantDetail);
        setRestaurantMenu(fetchHiddenShort);
        break;
      default:
        setSelectedId(567051);
        setRestaurant(fetchRestaurantDetail);
        setRestaurantMenu(fetchShortMenu);
        break;
    }
  }

  useEffect(() => {
    if (selectedId === 567051) {
      setRestaurant(fetchRestaurantDetail);
      setRestaurantMenu(shortMenu);
      setMenuMostSold(fetchShortMenu);
    }
    if (selectedId === 227018) {
      setRestaurant(fetchHiddenDetail);
      setRestaurantMenu(hiddenShort);
      setMenuMostSold(fetchHiddenShort);
    }
  }, [
    fetchRestaurantDetail,
    shortMenu,
    fetchShortMenu,
    fetchHiddenDetail,
    fetchHiddenShort,
    selectedId,
  ]);

  return (
    <>
      {!restaurant.loading ? (
        <>
          <header className="w-full h-[5%] md:w-[70%] mx-auto sticky top-0 z-[1]">
            <MenuCart />
            <nav className="w-full bg-[#28a359] p-2 flex justify-between">
              <button
                onClick={() => {
                  changeRestaurant(selectedId), clearMenus();
                }}
                className="p-2 bg-white hover:bg-slate-400 rounded-xl font-semibold flex items-center"
              >
                <IoIosArrowBack />
                <span>ดูเมนูร้านข้างๆ😅</span>
              </button>
              <button
                onClick={() => openCart("open")}
                className="w-[10%] max-w-[75px] relative p-2 flex justify-center items-center bg-white rounded-xl hover:bg-slate-400"
              >
                <FaShoppingBasket className="scale-[175%]" />
                {menus.length > 0 ? (
                  <span className="absolute top-4 -right-0.5 text-white bg-red-600 w-[25px] h-[25px] scale-75 rounded-full">
                    {totAmount}
                  </span>
                ) : null}
              </button>
            </nav>
          </header>
          <main className="w-full min-h-[95%] bg-white md:w-[70%] mx-auto relative">
            <img
              src={restaurant.data?.coverImage}
              className="w-full max-h-[300px] object-cover"
            />
            <div className="w-full p-4 flex flex-col gap-2">
              <div className="w-full flex flex-col">
                <h1 className="text-[2rem] font-semibold">
                  {restaurant.data?.name}
                </h1>
                <p className="text-[1rem] text-slate-700">
                  เวลาเปิด-ปิด: {restaurant.data?.activeTimePeriod.open} -
                  {restaurant.data?.activeTimePeriod.close}
                </p>
              </div>
              {!restaurantMenu.loading ? (
                <>
                  <div className="w-full grid items-center grid-cols-[minmax(30px,10%)_minmax(90%,100%)]">
                    <span className="text-[1.7rem] mx-auto">
                      <FiSearch />
                    </span>
                    <input
                      {...fieldSearchKeyword}
                      type="text"
                      placeholder="เช่น ข้าวผัด, ..."
                      className="w-full border border-black rounded-xl p-2 text-[1.2rem] placeholder:text-[1rem]"
                    />
                  </div>
                  <section className="w-full flex flex-col gap-2 md:hidden">
                    <h2 className="w-full text-[1.5rem] font-semibold border-b-[1px] border-slate-500">
                      เมนูยอดนิยม🔥
                    </h2>
                    <div className="flex gap-2">
                      {menuMostSold &&
                        menuMostSold.data
                          ?.sort((a, b) => b.sold - a.sold)
                          .map((menu, index) => {
                            if (index < 2) {
                              return (
                                <Link
                                  key={index}
                                  to={`/${selectedId}/${menu.name}`}
                                  className="w-full min-h-[250px] relative p-2 bg-white text-black rounded-xl overflow-hidden flex items-center flex-col gap-2"
                                >
                                  <img
                                    src={menu.thumbnailImage}
                                    className="w-[160px] aspect-square rounded-xl"
                                  />
                                  <div className="w-full h-full flex flex-col justify-between">
                                    <p className="text-[1.1rem]">{menu.id}</p>
                                    <p className="text-[1.5rem]">
                                      ฿{menu.fullPrice}
                                    </p>
                                    <button className="w-[25px] absolute bottom-4 right-2 aspect-square bg-black text-white rounded-full">
                                      +
                                    </button>
                                  </div>
                                </Link>
                              );
                            }
                          })}
                    </div>
                  </section>
                  <section className="w-full hidden md:flex flex-col gap-2">
                    <h2 className="w-full text-[1.5rem] font-semibold border-b-[1px] border-slate-500">
                      เมนูยอดนิยม🔥
                    </h2>
                    <div className="flex gap-2">
                      {menuMostSold &&
                        menuMostSold.data
                          ?.sort((a, b) => b.sold - a.sold)
                          .map((menu, index) => {
                            if (index < 4) {
                              return (
                                <Link
                                  key={index}
                                  to={`/${selectedId}/${menu.name}`}
                                  className="w-full min-h-[250px] relative p-2 bg-slate-100 text-black rounded-xl overflow-hidden flex items-center flex-col gap-2"
                                >
                                  <img
                                    src={menu.thumbnailImage}
                                    className="w-[160px] aspect-square rounded-xl"
                                  />
                                  <div className="w-full h-full flex flex-col justify-between">
                                    <p className="text-[1.1rem]">{menu.id}</p>
                                    <p className="text-[1.5rem]">
                                      ฿{menu.fullPrice}
                                    </p>
                                    <button className="w-[25px] absolute bottom-4 right-2 aspect-square bg-black text-white rounded-full">
                                      +
                                    </button>
                                  </div>
                                </Link>
                              );
                            }
                          })}
                    </div>
                  </section>
                  <section className="w-full flex flex-col gap-2">
                    <h2 className="w-full text-[1.5rem] font-semibold border-b-[1px] border-slate-500">
                      อาหาร
                    </h2>
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {restaurantMenu.data
                        ?.sort((a, b) => a.sold - b.sold)
                        .map((menu, index) => {
                          return (
                            <Link
                              key={index}
                              to={`/${selectedId}/${menu.name}`}
                              className="w-full h-[150px] relative p-2 bg-white md:bg-slate-100 text-black rounded-xl overflow-hidden flex gap-2"
                            >
                              <img
                                src={menu.thumbnailImage}
                                className="w-[40%] object-cover rounded-xl"
                              />
                              <div className="w-[50%] h-full flex flex-col justify-between">
                                <p className="text-[1.2rem] h-[75%] whitespace-break-spaces">
                                  {menu.id}
                                </p>
                                <p className="text-[1.6rem] h-[25%] font-semibold text-right">
                                  ฿{menu.fullPrice}
                                </p>
                                <button className="w-[25px] absolute top-4 right-2 aspect-square bg-black text-white rounded-full">
                                  +
                                </button>
                              </div>
                            </Link>
                          );
                        })}
                    </div>
                  </section>
                </>
              ) : (
                <div className="w-full mt-[10dvh] flex justify-center items-center">
                  <FallingLines color="#0EC963" width="100" visible={true} />
                </div>
              )}
            </div>
          </main>
        </>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <RotatingLines
            strokeColor="white"
            strokeWidth="5"
            animationDuration="1.2"
            width="96"
            visible={true}
          />
        </div>
      )}
      <Outlet />
    </>
  );
};

export default Homepage;
