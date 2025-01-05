"use client";
import React, { useMemo, useState } from "react";
import Modal from "./Modal";
import useAddModal from "@/app/hook/useAddModal";
import Heading from "../Heading";
import { genre } from "../Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

enum STEPS {
  CATEGORY = 0,
  IMAGES = 1,
  INFO = 2,
  DESCRIPTION = 3,
}

const AddModal = () => {
  const addModal = useAddModal();
  const router = useRouter();

  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      imageSrc: "",
      title: "",
      author: "",
      page: 1,
      imprint: "",
      isbn: 1,
      published: "",
      description: "",
    },
  });

  const category = watch("category");
  const imageSrc = watch("imageSrc");

  const setCustomValue = (id: string, value: string) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.DESCRIPTION) {
      return onNext();
    }

    setIsLoading(true);

    console.log(data);

    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Book Added!");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        addModal.onClose();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.DESCRIPTION) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-6">
      <Heading
        title="Which of these best describe this book?"
        subtitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto pb-2 pr-2">
        {genre.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of the book"
          subtitle="Show what your book looks like!"
        />
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="How would you describe this book?"
          subtitle="Tell us what inside this book!"
        />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="author"
          label="Author"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="page"
          label="Page Count"
          disabled={isLoading}
          register={register}
          errors={errors}
          type="number"
          required
        />
        <Input
          id="imprint"
          label="Imprint"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="published"
          label="Published"
          disabled={isLoading}
          register={register}
          errors={errors}
          type="date"
          required
        />
        <Input
          id="isbn"
          label="ISBN"
          disabled={isLoading}
          register={register}
          errors={errors}
          type="number"
          required
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="How would you describe this book?"
          subtitle="Tell us what inside this book!"
        />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          textArea
          required
        />
      </div>
    );
  }

  return (
    <Modal
      title="Openshelf"
      isOpen={addModal.isOpen}
      onClose={addModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      secondaryActionLabel={secondaryActionLabel}
      body={bodyContent}
    />
  );
};

export default AddModal;
