"use client"

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table"
import {
  ArrowUpDown,
  ChevronDown,
  Download,
  Filter,
  MessageCircle,
  MoreHorizontal,
  UserPlus,
  Users
} from "lucide-react"
import * as React from "react"

import MembershipForm from "@/components/forms/membershipForm"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect } from "react"
// 1. Member Interface
export type Member = {
  _id: string
  name: string
  email: string
  mobile: string
  whatsapp: string
  occupation: string
  invited: boolean
  createdAt?: string
}

// WhatsApp Function
const sendWhatsAppInvite = (member: Member) => {
  const message = `Hello ${member.name}, humne aapko invite karne ke liye message bheja hai! 
  https://whatsapp.com/channel/0029VadQqnuHVvTWWWHVzB3B
  `
  const phone = member.whatsapp.startsWith("91") ? member.whatsapp : `91${member.whatsapp}`
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank")
}

// 2. Column Definitions
export const columns: ColumnDef<Member>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Name <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex flex-col">
        <div className="font-medium">{row.getValue("name")}</div>
        {row.original.occupation && (
          <div className="text-xs text-muted-foreground">{row.original.occupation}</div>
        )}
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div className="lowercase truncate max-w-[200px]">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "whatsapp",
    header: "WhatsApp",
    cell: ({ row }) => (
      <div className="font-mono text-sm">
        {row.getValue("whatsapp")}
      </div>
    ),
  },
  {
    accessorKey: "invited",
    header: "Status",
    cell: ({ row }) => {
      const invited = row.getValue("invited") as boolean
      return (
        <Badge 
          variant={invited ? "default" : "secondary"}
          className={invited ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
        >
          {invited ? "Invited" : "Pending"}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const member = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem 
              onClick={() => navigator.clipboard.writeText(member._id)}
              className="cursor-pointer"
            >
              Copy Member ID
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => navigator.clipboard.writeText(member.whatsapp)}
              className="cursor-pointer"
            >
              Copy WhatsApp
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-green-600 focus:text-green-600 font-medium cursor-pointer"
              onClick={() => sendWhatsAppInvite(member)}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Send Invite
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function MembersManagementPage() {
  const [data, setData] = React.useState<Member[]>([])
  const [loading, setLoading] = React.useState(true)
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [sheetOpen, setSheetOpen] = React.useState(false)

  // Fetch Data from API
  const fetchMembers = async () => {
    try {
      const res = await fetch("/api/members")
      const json = await res.json()
      if (json.success) setData(json.members)
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMembers()
  }, [])

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
  })

  const handleMemberAdded = () => {
    setSheetOpen(false)
    fetchMembers()
  }

  // Stats calculations
  const totalMembers = data.length
  const invitedMembers = data.filter(member => member.invited).length
  const pendingInvites = totalMembers - invitedMembers

  return (
    <div className="w-full p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Members Directory</h1>
          <p className="text-muted-foreground mt-1">
            Manage your community members and track invitations
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button className="gap-2">
                <UserPlus className="h-4 w-4" />
                Add New Member
              </Button>
            </SheetTrigger>
            <SheetContent className="md:min-w-5xl sm:max-w-2xl">
              <SheetHeader className="pb-6">
                <SheetTitle className="text-2xl">Add New Member</SheetTitle>
                <SheetDescription>
                  Fill in the details below to add a new member to the directory.
                </SheetDescription>
              </SheetHeader>
              
              {/* Form in Card */}
              <Card className="border-0 shadow-none">
                <CardContent className="px-12 py-8">
                  <MembershipForm onSuccess={handleMemberAdded} />
                </CardContent>
              </Card>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Members</p>
                <p className="text-3xl font-bold mt-2">{totalMembers}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Invited</p>
                <p className="text-3xl font-bold mt-2 text-green-600">{invitedMembers}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-3xl font-bold mt-2 text-amber-600">{pendingInvites}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                <Filter className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>All Members</CardTitle>
              <CardDescription>
                Browse and manage all community members
              </CardDescription>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <Input
                placeholder="Search by name, email, or phone..."
                value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                onChange={(event) => {
                  const value = event.target.value
                  table.getColumn("name")?.setFilterValue(value)
                  table.getColumn("email")?.setFilterValue(value)
                  table.getColumn("whatsapp")?.setFilterValue(value)
                }}
                className="w-full sm:w-64"
              />
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Columns
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {table.getAllColumns().filter(col => col.getCanHide()).map(column => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id === "name" ? "Name & Occupation" : 
                       column.id === "email" ? "Email" :
                       column.id === "whatsapp" ? "WhatsApp" :
                       column.id === "invited" ? "Status" : column.id}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="p-0">
          <div className="overflow-hidden">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} className="font-semibold">
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-48 text-center">
                      <div className="flex flex-col items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900 mb-4"></div>
                        <p className="text-muted-foreground">Loading members...</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow 
                      key={row.id} 
                      data-state={row.getIsSelected() && "selected"}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-48 text-center">
                      <div className="flex flex-col items-center justify-center py-8">
                        <Users className="h-12 w-12 text-gray-300 mb-4" />
                        <p className="text-lg font-medium text-gray-500">No members found</p>
                        <p className="text-sm text-gray-400 mt-1 max-w-md text-center">
                          Add your first member by clicking the "Add New Member" button
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>

        {/* Table Footer with Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 border-t">
          <div className="text-sm text-muted-foreground">
            Showing {table.getRowModel().rows.length} of {data.length} members
            {table.getFilteredSelectedRowModel().rows.length > 0 && (
              <span className="ml-2 font-medium">
                ({table.getFilteredSelectedRowModel().rows.length} selected)
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <div className="flex items-center gap-1">
              <span className="text-sm">Page</span>
              <span className="font-medium">
                {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </Card>

      {/* Bulk Actions (if rows selected) */}
      {table.getFilteredSelectedRowModel().rows.length > 0 && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="font-medium text-blue-800">
                  {table.getFilteredSelectedRowModel().rows.length} member(s) selected
                </p>
                <p className="text-sm text-blue-600 mt-1">
                  Perform bulk actions on selected members
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 border-blue-200 text-blue-700 hover:bg-blue-100"
                  onClick={() => {
                    const selectedMembers = table.getFilteredSelectedRowModel().rows.map(row => row.original)
                    selectedMembers.forEach((member, index) => {
                      setTimeout(() => sendWhatsAppInvite(member), index * 500)
                    })
                  }}
                >
                  <MessageCircle className="h-4 w-4" />
                  Bulk Invite
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 border-red-200 text-red-700 hover:bg-red-50"
                  onClick={() => {
                    if (confirm(`Are you sure you want to delete ${table.getFilteredSelectedRowModel().rows.length} selected members?`)) {
                      // Bulk delete implementation
                    }
                  }}
                >
                  Delete Selected
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}