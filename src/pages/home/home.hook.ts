import { useRestaurantDataStore } from "@/data";
import { useHiddenDataStore } from "@/data/background";
import { shortMenu } from "@/interfaces";
import { restaurantService } from "@/services";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export const useHook = () => {
  const { register, watch } = useForm();
  const {
    fetchShortMenu,
    setShortMenu,
    setFetchRestaurantDetail,
    setFetchShortMenu,
  } = useRestaurantDataStore();
  const {
    fetchHiddenShort,
    setHiddenShortMenu,
    setFetchHiddenDetail,
    setFetchHiddenShortMenu,
  } = useHiddenDataStore();

  const searchKeyword = watch("searchKeyword");

  function removeDuplicatesMenu(arr: string[]) {
    return arr.filter((i, index) => arr.indexOf(i) === index);
  }

  const callAPI = async () => {
    const allMenu: shortMenu[] = [];

    setFetchRestaurantDetail({ data: undefined, loading: true });

    const response = await restaurantService.getRestaurantDetail(567051);
    if (response.status === 200) {
      setFetchRestaurantDetail({ data: response.data, loading: false });

      const menus = removeDuplicatesMenu(response.data.menus);

      // faster fetching but need to shorthening code length
      // setShortMenu({ data: undefined, loading: true });
      // setFetchShortMenu({ data: undefined, loading: true });

      // for (let i = 0; i <= 9; i++) {
      //   const response = await restaurantService.getShortMenu(567051, menus[i]);
      //   if (response.status === 200) {
      //     allMenu.push(response.data);
      //   }
      // }

      // setShortMenu({ data: allMenu, loading: false });
      // setFetchShortMenu({ data: allMenu, loading: false });

      // for (let i = 10; i <= 19; i++) {
      //   const response = await restaurantService.getShortMenu(567051, menus[i]);
      //   if (response.status === 200) {
      //     allMenu.push(response.data);
      //   }
      // }

      // setShortMenu({ data: allMenu, loading: false });
      // setFetchShortMenu({ data: allMenu, loading: false });

      // for (let i = 20; i <= 29; i++) {
      //   const response = await restaurantService.getShortMenu(567051, menus[i]);
      //   if (response.status === 200) {
      //     allMenu.push(response.data);
      //   }
      // }

      // setShortMenu({ data: allMenu, loading: false });
      // setFetchShortMenu({ data: allMenu, loading: false });

      // for (let i = 30; i <= 39; i++) {
      //   const response = await restaurantService.getShortMenu(567051, menus[i]);
      //   if (response.status === 200) {
      //     allMenu.push(response.data);
      //   }
      // }

      // setShortMenu({ data: allMenu, loading: false });
      // setFetchShortMenu({ data: allMenu, loading: false });

      // for (let i = 40; i <= 49; i++) {
      //   const response = await restaurantService.getShortMenu(567051, menus[i]);
      //   if (response.status === 200) {
      //     allMenu.push(response.data);
      //   }
      // }

      // setShortMenu({ data: allMenu, loading: false });
      // setFetchShortMenu({ data: allMenu, loading: false });

      // for (let i = 50; i <= 59; i++) {
      //   const response = await restaurantService.getShortMenu(567051, menus[i]);
      //   if (response.status === 200) {
      //     allMenu.push(response.data);
      //   }
      // }

      // setShortMenu({ data: allMenu, loading: false });
      // setFetchShortMenu({ data: allMenu, loading: false });

      setShortMenu({ data: undefined, loading: true });
      setFetchShortMenu({ data: undefined, loading: true });

      for (const menu of menus) {
        const response = await restaurantService.getShortMenu(567051, menu);
        if (response.status === 200) {
          allMenu.push(response.data);
        } else {
          setShortMenu({ data: undefined, loading: false });
          setFetchShortMenu({ data: undefined, loading: false });
        }
      }

      setShortMenu({ data: allMenu, loading: false });
      setFetchShortMenu({ data: allMenu, loading: false });
    } else {
      console.log("data", response.data);
      setFetchRestaurantDetail({ data: response.data, loading: false });
    }
  };

  const callHiddenAPI = async () => {
    const allMenu: shortMenu[] = [];

    setFetchHiddenDetail({ data: undefined, loading: true });

    const response = await restaurantService.getRestaurantDetail(227018);
    if (response.status === 200) {
      setFetchHiddenDetail({ data: response.data, loading: false });

      const menus = removeDuplicatesMenu(response.data.menus);

      setHiddenShortMenu({ data: undefined, loading: true });
      setFetchHiddenShortMenu({ data: undefined, loading: true });
      for (const menu of menus) {
        const response = await restaurantService.getShortMenu(227018, menu);
        if (response.status === 200) {
          allMenu.push(response.data);
        } else {
          setHiddenShortMenu({ data: undefined, loading: false });
          setFetchHiddenShortMenu({ data: undefined, loading: false });
        }
      }
      setHiddenShortMenu({ data: allMenu, loading: false });
      setFetchHiddenShortMenu({ data: allMenu, loading: false });
    } else {
      console.log("data", response.data);
      setFetchHiddenDetail({ data: response.data, loading: false });
    }
  };

  function searchMenu(data: shortMenu[] | undefined, keyword: string) {
    return data?.filter((i) =>
      i.name
        ?.toLowerCase()
        .replace(/ /g, "")
        .includes(keyword?.toLowerCase().replace(/ /g, ""))
    );
  }

  useEffect(() => {
    callAPI();
    callHiddenAPI();
  }, []);

  useEffect(() => {
    const data = searchMenu(fetchShortMenu.data, searchKeyword);
    setShortMenu({ data: data, loading: false });
    const hiddenData = searchMenu(fetchHiddenShort.data, searchKeyword);
    setHiddenShortMenu({ data: hiddenData, loading: false });
  }, [searchKeyword]);

  return {
    fieldSearchKeyword: register("searchKeyword"),
  };
};
