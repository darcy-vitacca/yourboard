import { TodoContainer } from "../header/sections/SideMenu/SideMenu.styles";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TaskListTimeSection } from "./TaskListTimeSection";
import { TaskListItem } from "./TaskListItem";
import { TaskAddItem } from "./TaskAddItem";
import {
  useAuthDispatch,
  useAuthState,
} from "../../components/context/context";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";

interface FormValue {
  linkText: string;
  taskItems: any;
}

const defaultValues = {
  linkText: "",
  taskItems: [],
};

export const validationSchema = Yup.object({
  linkText: Yup.string(),
  taskItems: Yup.array().of(
    Yup.object().shape({
      task_name: Yup.string().nullable().required("Required"),
      task_time: Yup.string().nullable().required("Required"),
      completed: Yup.boolean().nullable().required("Required"),
    })
  ),
});

export const TaskList = () => {
  const dispatch = useAuthDispatch();

  const methods = useForm<any>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: defaultValues,
    resolver: yupResolver(validationSchema),
    context: undefined,
    criteriaMode: "firstError",
    shouldFocusError: true,
  });

  const {
    handleSubmit,
    watch,
    control,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = methods;

  const { fields, append, remove } = useFieldArray<any>({
    name: "taskItems",
    control,
  });

  const handleDelete = async (index) => {
    await remove(index);
  };

  const appendItem = async () => {
    append("");
  };

  const onSubmit = async (formData: any) => {
    try {
      dispatch("LOADING");
    } catch (err: any) {
      console.log(err);
    }
  };

  const watched = watch("taskItems");
  console.log("watched", watched);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TodoContainer>
          <TaskListTimeSection fields={fields} />
          {fields.map((item: any, index) => (
            <TaskListItem
              key={item.id}
              index={index}
              item={item}
              handleDelete={handleDelete}
              control={control}
              setValue={setValue}
            />
          ))}
          <TaskAddItem append={append} />
        </TodoContainer>
      </form>
    </FormProvider>
  );
};
