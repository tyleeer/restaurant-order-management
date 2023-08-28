import { useCartStore } from "@/data/menuCart";
import { openCart } from "@/utils";
import { AiFillCloseCircle } from "react-icons/ai";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { BiSolidEdit } from "react-icons/bi";

const MenuCart = () => {
  const { menus, setMenus, clearMenus } = useCartStore();
  const eachMenuPrice: number[] = [];
  let totAmount = 0;

  for (const menu of menus) {
    if (menu.menuData) {
      eachMenuPrice.push(menu.amount * menu.menuData.fullPrice);
      totAmount = totAmount + menu.amount;
    }
  }

  function order() {
    openCart("close");
    clearMenus();
  }

  function deleteMenu(index: number) {
    menus.splice(index, 1);
    setMenus(menus);
  }

  return (
    <div
      id="menusCart"
      className="fixed top-0 right-0 z-10 w-full h-full bg-white flex justify-end transition-all duration-500 translate-x-[100dvw]"
    >
      <section className="w-full max-w-[450px] flex flex-col py-2 px-4 gap-4 overflow-y-scroll">
        <button
          onClick={() => openCart("close")}
          className="fixed z-[2] top-2 right-2 text-[#10C157] hover:text-[#2a9053] text-[3rem]"
        >
          <AiFillCloseCircle />
        </button>
        <h1 className="text-[2rem]">รายการอาหาร</h1>
        {menus.length > 0 ? (
          <ul className="w-full h-full flex flex-col gap-4">
            {menus.map((menu, index) => {
              return (
                <li
                  key={index}
                  className="w-full min-h-[150px] relative p-2 bg-slate-200 text-black rounded-xl overflow-hidden flex items-center gap-2"
                >
                  <button className="hidden absolute top-2 right-2 text-[1.5rem] text-black hover:text-[#10C157]">
                    <BiSolidEdit />
                  </button>
                  <button
                    onClick={() => deleteMenu(index)}
                    className="absolute bottom-2 right-2 text-[1.5rem] text-red-600 hover:text-red-800"
                  >
                    <RiDeleteBin6Fill />
                  </button>
                  <img
                    src={menu.menuData?.thumbnailImage}
                    className="rounded-xl"
                  />
                  <div className="w-full h-full flex flex-col justify-between">
                    <h2 className="text-[1.3rem] font-semibold">
                      {menu.menuData?.id}
                    </h2>
                    <p className="text-[1.1rem] text-slate-500">
                      รายละเอียดเพิ่มเติม:{" "}
                      {menu.request !== "" ? menu.request : "ไม่มี"}
                    </p>
                    <div className="flex justify-around text-[1.4rem]">
                      <p>จำนวน {menu.amount}</p>
                      <p className="">
                        {menu.menuData &&
                          menu.menuData?.fullPrice * menu.amount}
                        ฿
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
            <button
              onClick={order}
              className="w-[80%] mx-auto p-2 flex justify-between items-center font-semibold text-white text-[1.2rem] bg-[#10C157] hover:bg-slate-600 rounded-xl"
            >
              <span className="font-semibold">
                สั่งอาหาร ({totAmount} รายการ)
              </span>
              <span></span>
              <span>
                รวม{" "}
                {eachMenuPrice.reduce((acc, cur) => {
                  return acc + cur;
                }, 0)}
                ฿
              </span>
            </button>
          </ul>
        ) : (
          <section className="w-full h-full flex flex-col justify-center items-center">
            <h1 className="text-[2rem] font-semibold">ไม่มีอาหารในตะกร้า</h1>
            <h2 className="flex items-center gap-2 text-[1.5rem] text-slate-600">
              กด <AiFillCloseCircle /> เพื่อกลับไปเลือกอาหาร
            </h2>
          </section>
        )}
      </section>
    </div>
  );
};

export default MenuCart;
