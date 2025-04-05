import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
// import { apiService } from "@/services/api";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { apiService } from "@/services/api";

const FormWrapper = ({ schema, fields, apiEndpoint, onSuccess, defaultValues }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: zodResolver(schema),
        defaultValues,
        mode: "onBlur",
      });
      const onSubmit = async (data) => {
        const formattedData = {
          ...data,
          sellingPrice: Number(data.sellingPrice), 
          costPrice: Number(data.costPrice),
        };
      
        try {
            await apiService.post("product", formattedData);
            toast.success("Product added successfully!");
          } catch (error) {
            console.error("API Error:", error.response?.data || error.message);
            toast.error("Error adding product!");
          }
          
      };

      
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
 {fields.map(({ name, label, type }) => (
  <div key={name}>
    <Label htmlFor={name}>{label}</Label>
    <Input
      id={name}
      type={type}
         {...register(name, {
             setValueAs: v => (v === "" ? undefined : type === "number" ? Number(v) : v)
          })}
      className="w-full"
    />
    {errors[name] && <p className="text-red-500 text-sm">{errors[name]?.message}</p>}
  </div>
))}
    <Button type="submit">Save</Button>
  </form>
  
  );
};

export default FormWrapper;
