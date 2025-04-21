import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "../ui/label";
import { useQuery } from "@tanstack/react-query";
import { fetchDataClient } from "@/lib/fetch-client";

export default function DelearRadioGroup({ brand, city = "Surat" }) {
  const {
    data: response,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["dealers", { brand, city }],
    queryFn: () =>
      fetchDataClient(`dealership?brand=${brand}&city=${city}&limit=${1e3}`),
    enabled: Boolean(brand && city),
  });

  if (response && response.totalRecords > 0) {
    const dealers = response?.data;

    return (
      <div className="flex flex-col gap-y-2">
        <p className="text-sm mb-2 font-medium">Select Dealership:</p>
        <div className="flex flex-col gap-y-2">
          <RadioGroup defaultValue={dealers[0].id}>
            {dealers?.map((dealer) => {
              const { id, dealer_name, address } = dealer;
              return (
                <div key={id} className="flex gap-x-4 border rounded-md p-4">
                  <RadioGroupItem value={id} id={dealer_name} />
                  <Label key={id} htmlFor={id} className="flex space-x-4">
                    <div>
                      <p className="text-gray-darker font-semibold mb-2">
                        <span className="text-black">{brand}</span>{" "}
                        {dealer_name}
                      </p>
                      <p className="text-gray-darker text-sm font-normal">
                        {address}
                      </p>
                    </div>
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        </div>
      </div>
    );
  }
}
