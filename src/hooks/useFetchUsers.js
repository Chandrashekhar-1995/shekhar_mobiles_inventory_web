import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllUser } from "../../service/userApi";
import { addAllUser, removeAllUser } from "../store/allUserSlice";

const useFetchUsers = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getAllUser();
                dispatch(addAllUser(data.data.users))
            } catch (error) {
                console.error("Failed to fetch users:", error);
            }
        };

        fetchUsers();
        // return () => {
        //     dispatch(removeAllUser());
        // };
    }, [dispatch]);
};

export default useFetchUsers;
