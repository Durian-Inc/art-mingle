import React, { useState } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const ADD_PROJECT = gql`
  mutation AddProject($projects: String!) {
    addProject(project: $projects) {
      projects
    }
  }
`;

const GET_PROJECTS = gql`
  query GetProjects {
    projects
  }
`;

const Divider = styled.hr`
  width: 100%;
`;

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Title = styled.h1`
  color: #212121;
  font-size: 36px;
  font-weight: normal;
  margin: 10px 0 20px 0;
`;

const SectionTitle = styled.h2`
  color: #212121;
  font-size: 24px;
  font-weight: normal;
`;

const FormSection = styled.form`
  display: flex;
  flex-direction: column;
  margin: -45px 0 0 200px;
`;

const FormLabel = styled.label`
  color: #212121;
  display: flex;
  flex-direction: column;
  font-size: 24px;
  margin: 0 0 50px 0;

  input {
    border: solid #949494 1px;
    border-radius: 5px;
    color: #949494;
    font-size: 18px;
    height: 50px;
    margin: 10px 0 0 0;
  }
`;

const SubmitButton = styled.button`
  background: #88c969;
  border: solid #88c969 3px;
  border-radius: 5px;
  font-size: 18px;
  height: 50px;
  width: 150px;
`;

const AddPromptPage = () => {
  const [title, setTitle] = useState("Minimalist Graphic Design");
  const [date, setDate] = useState("Deadline");
  const [desc, setDesc] = useState("Description of my new project!");

  const changeHandler = (event) => {
    console.log(event.target.name);

    if (event.target.name === "title") {
      setTitle(event.target.value);
    } else if (event.target.name === "date") {
      setDate(event.target.value);
    } else if (event.target.name === "desc") {
      setDesc(event.target.value);
    } else {
      console.log("This shouldn't happen!!");
    }
  }

  const submitHandler = (event) => {
    event.preventDefault();

    console.log( {title, date, desc} );

    console.log(addProject({ variables: { type: event.target.value } }));
    
  }

  const [addProject] = useMutation(
    ADD_PROJECT,
    {
      update(cache, { data: {addProject} }) {
        const { projects } = cache.readQuery({ query: GET_PROJECTS });
        cache.writeQuery({
          query: GET_PROJECTS,
          data: { projects: projects.concat([addProject]) }
        });
      }
    }
  );

  return (
    <Wrapper>
      <Title>Submit Your Prompt</Title>
      <Divider />
      <SectionTitle>Basic Info</SectionTitle>

      <FormSection onSubmit={submitHandler}>
        <FormLabel>
          Title
          <input type="text" name="title" value={title} onChange={changeHandler} />
        </FormLabel>
        <FormLabel>
          Deadline
          <input type="date" name="date" value={date} onChange={changeHandler} />
        </FormLabel>
        <FormLabel>
          Description
          <input type="text" name="desc" value={desc} onChange={changeHandler} />
        </FormLabel>
        <SubmitButton type="submit">Add Prompt</SubmitButton>
      </FormSection>
    </Wrapper>
  );
};

export { AddPromptPage };
