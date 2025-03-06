import { Form } from "react-router-dom";
import { Search } from "lucide-react";

const SearchForm = ({ query }: { query?: string }) => {
  return (
    <Form
      action="/produtos"
      className="w-full font-nunito"
      id="form-search"
    >
      <div className="flex items-center w-full focus-within:border-green-500 transition duration-300 pr-3 gap-2 bg-white border-green-500/30 border-[2px] h-[46px] rounded-[5px] overflow-hidden">
        <input
          name="query"
          defaultValue={query}
          className="w-full h-full pl-4 outline-none placeholder-gray-500 text-base"
          placeholder="Buscar produto..."
        />
        <div className="flex gap-2">
          <button type="submit" className="flex justify-center items-center">
            <Search />
          </button>
        </div>
      </div>
    </Form>
  );
};

export default SearchForm;
