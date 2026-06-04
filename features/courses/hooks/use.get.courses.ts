'use client';
import { useEffect, useState } from 'react';
import { useCoursesQuery } from '../api/courses.api';
import { Level } from '../types/course.types';

type UseCourseResult = {
  page: number;
  category?: string;
  search?: string;
  instructorId?: string;
  level?: Level;
  price?: number;
};

const useGetCourses = (prop: UseCourseResult) => {
  const { isLoading, isError, data, refetch, isFetching, error } =
    useCoursesQuery(prop);

  return {
    coursesLength: data?.data.length ?? 0,
    meta: data?.meta,
    isLoading,
    isError,
    refetch,
    isFetching,
    error,
    courses: data?.data,
  };
};

export default useGetCourses;
