import { apartmentAPI } from "app/api/apartment";
import { Apartment } from "app/model";

export const getApartmentQuery = async (
  key,
  page?: number
): Promise<Array<Apartment>> => {
  try {
    const response = await apartmentAPI.fetchAllApartment(page ? page : null);
    return response.data;
  } catch (error) {
    console.log("Failed to fetch apartments");
    throw Error("Failed to fetch apartments");
  }
};

export const getOneApartment = async (key, id?: string): Promise<Apartment> => {
  try {
    if (!id) return;
    const response = await apartmentAPI.fetchOneApartmentByID(id);
    return response.data;
  } catch (error) {
    console.log("Failed to fetch apartments by id");
    throw Error("Failed to fetch apartments by id");
  }
};

export const getOneApartmentQuery = async ({
  queryKey,
}): Promise<Apartment> => {
  try {
    const [_, id] = queryKey;
    const response = await apartmentAPI.fetchOneApartmentByID(id);
    return response.data;
  } catch (error) {
    console.log("Failed to fetch apartments by id");
    throw Error("Failed to fetch apartments by id");
  }
};

// useEffect(() => {
//   (async () => {
//     // fetch List Api
//     try {
//       setLoading(true);
//       const apartmentResponse: DataResponse<Array<Apartment>> = await apartmentAPI
//         .fetchAllApartment()
//         .then((res) => {
//           setLoading(false);
//           return res;
//         });

//       if (apartmentResponse) {
//         setApartmentList(apartmentResponse?.data);
//       }
//     } catch (err) {
//       setLoading(false);
//       console.log("failed to fetch apartments: " + err);
//     }
//   })();

//   // setApartmentList(listFake.data.apartment);
// }, [location, reload]);

// useEffect(() => {
//   try {
//     setLoading(true);
//     dispatch(
//       fetchApartmentList(
//         () => {
//           setLoading(false);
//         },
//         () => {
//           setLoading(false);
//           message.error("Failed to fetch apartment list. Try again.");
//         }
//       )
//     );
//   } catch (error) {
//     setLoading(false);
//     console.log("failed to fetch apartments: " + error);
//   }
// }, []);
