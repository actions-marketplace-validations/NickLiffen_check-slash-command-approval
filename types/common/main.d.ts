type approvers = string[];

type regionInformation = {
  salesforceName: string;
  label: string;
  approvers: approvers;
};

type file = regionInformation[];

type filteredData = string[];
