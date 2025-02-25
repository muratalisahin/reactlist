import { MdOutlineNoteAdd } from "react-icons/md";
import { useDispatch } from "react-redux";
import { modalFunc } from "../redux/modalSlice";
import { searchDataFunc, sortingDataFunc } from "../redux/dataSlice";

const Header = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-between bg-indigo-600 text-white px-4 py-3">
      <div className="text-3xl">REACT UYGULAMA</div>
      <div className="flex items-center gap-5">
        <div>
          <select
            onChange={(e) => dispatch(sortingDataFunc(e.target.value))}
            className="h-10 rounded-lg"
          >
            <option value="asc">Artan</option>
            <option value="desc">Azalan</option>
          </select>
        </div>

        <input
          onChange={(e) => dispatch(searchDataFunc(e.target.value))}
          className="h-10 rounded-lg bg-white text-black placeholder:text-gray-600"
          type="text"
          placeholder="Arama Yapınız "
        />

        <div
          onClick={() => dispatch(modalFunc())}
          className="bg-indigo-900 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
        >
          <MdOutlineNoteAdd size={24} />
        </div>
      </div>
    </div>
  );
};

export default Header;