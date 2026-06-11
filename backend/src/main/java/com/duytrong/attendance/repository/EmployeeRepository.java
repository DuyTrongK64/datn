package com.duytrong.attendance.repository;

import com.duytrong.attendance.domain.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface EmployeeRepository extends JpaRepository<Employee, UUID> {
    Optional<Employee> findByEmployeeCode(String employeeCode);
    Optional<Employee> findByEmployeeCodeIgnoreCase(String employeeCode);
    List<Employee> findByDepartmentId(UUID departmentId);
}
