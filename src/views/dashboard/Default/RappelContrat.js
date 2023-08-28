import React, { useState } from "react";
import styled from "@emotion/styled";
import { Box, Typography, Card, CardContent } from "@mui/material";
import DateRangeRoundedIcon from "@mui/icons-material/DateRangeRounded";
import { useNavigate } from "react-router-dom";
const contractsData = [
  { id: 1, title: "Contract A", expiryDate: "2023-09-01" },
  { id: 2, title: "Contract B", expiryDate: "2023-09-15" },
  { id: 3, title: "Contract C", expiryDate: "2023-09-20" },
];

const CardWrapper = styled(Card)`
  border: 1px solid #ccc;
  border-radius: 8px;

  position: relative;
`;

const ContractIcon = styled(DateRangeRoundedIcon)`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 30px;
  cursor: pointer;
`;
const ContractList = () => {
  const navigate = useNavigate();

  const handleListIconClick = () => {
    // Redirect to the specified link
    navigate("/dashboard/Reminder");
  };

  return (
    <CardWrapper>
      <CardContent>
        <ContractIcon onClick={handleListIconClick} />
        <Typography variant="h4" gutterBottom>
          Rappel des contrats
        </Typography>
        <ul>
          {contractsData.map((contract) => (
            <li key={contract.id}>
              <strong>{contract.title}</strong> - Expires on{" "}
              {contract.expiryDate}
            </li>
          ))}
        </ul>
      </CardContent>
    </CardWrapper>
  );
};

export default ContractList;
