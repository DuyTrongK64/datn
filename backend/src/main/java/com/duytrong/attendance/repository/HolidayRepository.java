package com.duytrong.attendance.repository;

import com.duytrong.attendance.domain.Holiday;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface HolidayRepository extends JpaRepository<Holiday, UUID> {
    Optional<Holiday> findFirstByHolidayDate(LocalDate holidayDate);
    List<Holiday> findByHolidayDateBetweenOrderByHolidayDateAsc(LocalDate from, LocalDate to);

    @Query("""
            select h
            from Holiday h
            where h.holidayDate <= :date
              and coalesce(h.endDate, h.holidayDate) >= :date
            order by h.holidayDate asc
            """)
    List<Holiday> findEffectiveHolidays(@Param("date") LocalDate date);

    default Optional<Holiday> findFirstEffectiveHoliday(LocalDate date) {
        return findEffectiveHolidays(date).stream().findFirst();
    }

    @Query("""
            select h
            from Holiday h
            where h.holidayDate <= :to
              and coalesce(h.endDate, h.holidayDate) >= :from
            order by h.holidayDate asc
            """)
    List<Holiday> findEffectiveHolidaysBetween(@Param("from") LocalDate from,
                                               @Param("to") LocalDate to);
}
