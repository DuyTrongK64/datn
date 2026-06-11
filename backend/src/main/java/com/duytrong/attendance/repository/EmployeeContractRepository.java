package com.duytrong.attendance.repository;

import com.duytrong.attendance.common.enums.ContractStatus;
import com.duytrong.attendance.domain.EmployeeContract;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface EmployeeContractRepository extends JpaRepository<EmployeeContract, UUID> {
    List<EmployeeContract> findByEmployeeId(UUID employeeId);
    Optional<EmployeeContract> findFirstByEmployeeIdAndStatusAndStartDateLessThanEqualAndEndDateIsNullOrderByStartDateDesc(
            UUID employeeId, ContractStatus status, LocalDate workDate);
    Optional<EmployeeContract> findFirstByEmployeeIdAndStatusAndStartDateLessThanEqualAndEndDateGreaterThanEqualOrderByStartDateDesc(
            UUID employeeId, ContractStatus status, LocalDate workDate, LocalDate workDate2);
}
