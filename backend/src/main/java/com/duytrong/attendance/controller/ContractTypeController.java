package com.duytrong.attendance.controller;

import com.duytrong.attendance.common.BusinessException;
import com.duytrong.attendance.domain.ContractType;
import com.duytrong.attendance.domain.Shift;
import com.duytrong.attendance.repository.ContractTypeRepository;
import com.duytrong.attendance.repository.ShiftRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/contract-types")
@PreAuthorize("hasRole('ADMIN')")
public class ContractTypeController extends SimpleCrudController<ContractType> {
    private final ContractTypeRepository repository;
    private final ShiftRepository shiftRepository;

    public ContractTypeController(ContractTypeRepository repository, ShiftRepository shiftRepository) {
        super(repository);
        this.repository = repository;
        this.shiftRepository = shiftRepository;
    }

    @Override
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ContractType create(@RequestBody ContractType input) {
        input.setId(null);
        normalizeWorkingHours(input);
        return repository.save(input);
    }

    @Override
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ContractType update(@PathVariable UUID id, @RequestBody ContractType input) {
        ContractType existing = repository.findById(id)
                .orElseThrow(() -> new BusinessException("Không tìm thấy dữ liệu"));

        normalizeWorkingHours(input);
        BeanUtils.copyProperties(input, existing, "id", "createdAt", "updatedAt");

        return repository.save(existing);
    }

    private void normalizeWorkingHours(ContractType input) {
        if (input.getDefaultShiftId() == null) {
            input.setDefaultWorkingHoursPerDay(8);
            input.setDefaultWorkingDaysPerMonth(22);
            return;
        }

        Shift shift = shiftRepository.findById(input.getDefaultShiftId())
                .orElseThrow(() -> new BusinessException("Không tìm thấy lịch/ca làm việc mặc định"));

        int workingMinutes = shift.resolveWorkingMinutes();
        int workingHours = workingMinutes <= 0 ? 8 : Math.max(1, (int) Math.round(workingMinutes / 60.0));

        input.setDefaultWorkingHoursPerDay(workingHours);
        input.setDefaultWorkingDaysPerMonth(22);
    }
}
