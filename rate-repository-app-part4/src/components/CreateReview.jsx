import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-native";

import useCreateReviews from "../hooks/useCreateReviews";
import FormikTextInput from "./FormikTextInput";
import theme from "../theme";

const styles = StyleSheet.create({
  review: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    alignItems: "center",
    margin: 10,
    padding: 10,
  },
  reviewText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

const CreateReview = () => {
  const [createReview] = useCreateReviews();
  const navigate = useNavigate();

  const initialValues = {
    repositoryName: "",
    ownerName: "",
    rating: "",
    text: "",
  };

  const validationSchema = yup.object().shape({
    repositoryName: yup.string().required("Repository Name is required"),
    ownerName: yup.string().required("Repository Owner Name is required"),
    rating: yup
      .number()
      .integer("The Number must be interger")
      .min(0, "Can not be Negative Number ")
      .max(100, "Can not be a Number Greater than 100")
      .required("Rating is required"),
    text: yup.string(),
  });

  const onSubmit = async (values) => {
    const { repositoryName, ownerName, rating, text } = values;

    try {
      const review = await createReview({
        repositoryName,
        ownerName,
        rating: parseInt(rating),
        text,
      });
      
      const repositoryId = review.createReview?.repositoryId
      console.log(repositoryId)
      if (repositoryId) {
        navigate(`/repository/${repositoryId}`)
      }

    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => {
        return (
          <View>
            <FormikTextInput
              name="repositoryName"
              placeholder="Repository Name"
            />
            <FormikTextInput name="ownerName" placeholder="Owner Name" />
            <FormikTextInput
              name="rating"
              placeholder="Rating between 0 and 100"
            />
            <FormikTextInput name="text" placeholder="Review" multiline />
            <TouchableOpacity onPress={handleSubmit} style={styles.review}>
              <Text style={styles.reviewText}>Create a Review</Text>
            </TouchableOpacity>
          </View>
        );
      }}
    </Formik>
  );
};

export default CreateReview;
